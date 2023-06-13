import { useCallback, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { connect, useDispatch, useSelector } from "react-redux";
import { links } from "../constants/constants";
import { logout } from "../redux/features/auth/authSlice";

const NavLinks = ({ handleClick }) => {
  const dispatch = useDispatch();

  // access state
  const memoizedSelector = useCallback((state) => {
    console.log("state: ", state);
    return state.auth;
  }, []);

  const { isAuthenticated, user } = useSelector(memoizedSelector);

  const handleLogout = () => {
    dispatch(logout());
    console.log("user has been logged out Navbar.jsx");
  };
  return (
    <div className="mt-10 text-white">
      <div className="text-white flex items-center justify-center">
        {/* map over register and login constants */}
        {!isAuthenticated &&
          links.slice(0, 2).map((item) => (
            <button className="bg-white m-2">
              <NavLink
                key={item.name}
                to={item.to}
                activeClassName="text-[#FF0266]"
                className="flex flex-col justify-start items-center text-sm p-2 w-20 text-center font-medium text-black hover:cyan-400"
                onClick={() => {
                  handleClick && handleClick(false);
                  // sectionRef.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item.name}
              </NavLink>
            </button>
          ))}
        {isAuthenticated && (
          <>
            <p className="flex flex-col justify-start items-center text-sm py-2 w-20  text-center font-medium text-white  bg-black mr-4 hover:cyan-400">
              Hi {user.name}!
            </p>
            <button
              className="flex flex-col justify-start items-center text-sm p-2 w-20 text-center font-medium text-white  bg-black mr-4 hover:cyan-400"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col mx-auto justify-center items-center m-4">
        {links.slice(2).map((item) => (
          <button className="bg-black m-2">
            <NavLink
              key={item.name}
              to={item.to}
              activeClassName="text-[#FF0266]"
              className="flex flex-col justify-start items-center text-sm p-2 w-20 font-medium text-white hover:cyan-400"
              onClick={() => {
                handleClick && handleClick(false);
                // sectionRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.name}
            </NavLink>
          </button>
        ))}
      </div>
    </div>
  );
};

const Sidebar = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="md:flex flex-col w-[250px] py-10 px-4  bg-gradient-to-r from-[#e90d1f] to-black h-screen">
        <p
          onClick={() => navigate("/")}
          className="text-center text-blue-300 pb-2 text-xl hover:cursor-pointer"
        >
          .WAV
        </p>
        {/* <img
          //   src={purpwav}
          className="w-full h-14 object-contain cursor-pointer"
          //   onClick={handleFrontPageRedirect}
        /> */}
        <NavLinks onLogout={logout} />
      </div>

      {/* mobile side bar */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2"
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          //   src={purpwav}
          alt="logo"
          className="w-full h-14 object-contain"
          //   onClick={handleFrontPageRedirect}
        />

        <NavLinks
          //   onLogout={() => dispatch(logoutUser())}
          handleClick={() => setMobileMenuOpen(false)}
        />
      </div>
    </>
  );
};

export default Sidebar;
