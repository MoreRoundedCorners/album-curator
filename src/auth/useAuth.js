import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../redux/features/auth/authActions";
import axios from "axios";
import { useCallback } from "react";

function useAuth() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const login = async (email, password) => {
    console.log("Executing login function"); // Add this line
    try {
      await dispatch(loginUser(email, password));
      return { success: true };
    } catch (error) {
      // Improved error handling based on the API response
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    dispatch(logoutUser());
    console.log("user has been logged out useAuth.js");
  };

  const register = async (name, email, password) => {
    try {
      // replace!!!
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
        password,
      });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      return { success: false, error: errorMessage };
    }
  };

  const initializeAuth = useCallback(async () => {
    const storedToken = localStorage.getItem("token");
    console.log("storedToken from iniAuth", storedToken);

    if (storedToken) {
      // Make an API call to verify the token and retrieve the user data
      try {
        const response = await axios.get(
          // replace!!!
          "http://localhost:5000/api/users/protected",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        console.log("response headers", response.headers); // log the headers object to see if the Authorization header is set
        const { user } = response.data;
        console.log("user from iniAuth", user);

        // Check if the token has expired
        const tokenExpiration = new Date(user.exp * 1000);
        if (tokenExpiration > new Date()) {
          dispatch(loginUser(user, storedToken));
        } else {
          // Token has expired, log out the user
          localStorage.removeItem("token");
          dispatch(logoutUser());
        }
      } catch (error) {
        // Handle token verification errors
        localStorage.removeItem("token");
        dispatch(logoutUser());
      }
    } else {
      // No stored token found, ensure the user is logged out
      dispatch(logoutUser());
    }
    console.trace("initializeAuth");
  }, [dispatch]);

  return {
    isAuthenticated,
    user,
    token,
    login,
    logout,
    register,
    initializeAuth,
  };
}

export default useAuth;
