import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
const FormBody = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="w-full flex-col flex gap-y-[20px] mt-[30px] ">
          <div className="w-full flex flex-col gap-y-[10px]">
            <div className="w-full h-[52px]  relative">
              <Field
                name="email"
                type="email"
                className="w-full h-full px-[10px] outline-none border border-gray-200 rounded-[6px] bg-transparent"
              />
            </div>
            <div>
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-[10px]">
            <div className="w-full h-[52px]  relative">
              <Field
                name="password"
                type="password"
                className="w-full h-full px-[10px] outline-none border rounded-[6px] border-gray-200 bg-transparent"
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
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormBody;
