import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/features/auth/authActions";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(
      <p className="text-white text-[15px]">Name Required</p>
    ),
    email: Yup.string()
      .email("Invalid email address")
      .required(<p className="text-white p-0 m-0">Email Required</p>),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required(<p className="text-white">Password Required</p>),
  });

  const handleSubmit = async (values) => {
    console.log("values: ", values);
    dispatch(registerUser(values));
  };

  return (
    <section className="flex h-screen w-full bg-black flex-col items-center justify-center  animate-slideright">
      <div className="border-2 border-white p-32 bg-gradient-to-br from-black to-[#e90d1f] rounded-3xl">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <>
              <h1 className="text-center text-2xl text-white font-semibold">
                Register
              </h1>
              <Form className="flex flex-col gap-4 mt-4 w-80">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="bg-black text-white p-3 rounded-lg outline-none"
                />
                <ErrorMessage name="name" className="text-red-500" />
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

                {/* {error && <p className="text-red-500">{error}</p>} */}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-black p-3 rounded-lg outline-none"
                >
                  Register
                </button>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </section>
  );
};
