import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Cookie from "js-cookie";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const FormBody = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const response = await axios.post(
            // eslint-disable-next-line no-undef
            `${process.env.ENV_BACKEND_URL}/api/v1/auth/login`,
            {
              username: values.username,
              password: values.password,
            }
          );
          const token = response.data.data.token;
          Cookie.set("accessToken", token, { expires: 5 });
          navigate("/dashboard");
        } catch (error) {
          console.log(error);
          // toast.error(error.data.message);
        } finally {
          setIsLoading(false);
        }
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full flex-col flex gap-y-[20px] mt-[30px] ">
          <div className="w-full flex flex-col ">
            <div className="w-full   relative">
              <label>Username</label>
              <Field
                name="username"
                type="text"
                className="w-full h-[52px] px-[10px] outline-none border border-gray-200 rounded-[6px] bg-transparent"
              />
            </div>
            <div>
              {errors.username && touched.username ? (
                <div className="text-red-500">{errors.username}</div>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-[10px]">
            <div className="w-full  relative">
              <label>Password</label>
              <Field
                name="password"
                type="password"
                className="w-full h-[52px] px-[10px] outline-none border rounded-[6px] border-gray-200 bg-transparent"
              />
            </div>
            <div>
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}
            </div>
          </div>
          <button
            className="w-full bg-[#3e38be] rounded-[6px] text-white h-[52px]"
            type="submit"
          >
            {!isLoading ? "Submit" : <ClipLoader size={16} color="white" />}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormBody;
