import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/auth/authActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  return (
    <section className="flex h-screen w-full bg-black flex-col items-center justify-center animate-slideleft">
      <div className="border-2 border-white p-[150px] bg-gradient-to-br from-black to-[#e90d1f] rounded-3xl">
        <h1 className="text-center text-3xl text-white">Login</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            dispatch(loginUser(values.email, values.password));
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 mt-4 w-80">
              <Field
                name="email"
                type="text"
                placeholder="Email"
                className="bg-black text-white p-3 rounded-lg outline-none"
              />
              <ErrorMessage name="email" className="text-red-500" />
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="bg-black text-white p-3 rounded-lg outline-none"
              />
              <ErrorMessage name="password" className="text-red-500" />

              {error && <p className="text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black p-3 rounded-lg outline-none"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};
