import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import logo from "../../assets/logo1.png";
import { ROUTE_PATH } from "../../Router/RoutePath";


const SignUp = () => {
  const navigate = useNavigate();

const [otp, setOtp] = useState("")
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "First Name must contain only letters")
      .required("First Name is required"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Last Name must contain only letters")
      .min(1, "Last Name must be at least 2 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    aadharNumber: Yup.string()
      .matches(/^\d{12}$/, "Aadhar Number must be exactly 12 digits")
      .required("Aadhar number is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile Number must be exactly 10 digits")
      .required("Mobile number is required"),
      otp :  Yup.string()
      .matches(/^\d{4}$/, "OTP must be exactly 4 digits")
      .required("OTP is required"),

  });

  const formikProps = {
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      aadharNumber: "",
      mobileNumber: "",
      otp : ""
    },
    validationSchema,
    onSubmit: (values) => {
      const existingUser = JSON.parse(localStorage.getItem("user"));

      if (existingUser && existingUser.email === values.email) {
        alert("User already exists");
        return;
      }

      localStorage.setItem("user", JSON.stringify(values));
      alert("Registration successful!");
     
      console.log("Form Submitted", values);
      navigate(ROUTE_PATH.PASSWORD_SETUP);
    },
  };






  const formFields = [
    { label: "First Name", name: "firstName", type: "text", placeholder: "Enter your first name" },
    { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter your last name" },
    { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
    { label: "Aadhar Number", name: "aadharNumber", type: "text", placeholder: "Enter your aadhar number" },
    { label: "Mobile Number", name: "mobileNumber", type: "number", placeholder: "Enter your mobile number" },
    { label: "OTP", name: "otp", type: "number", placeholder: "Enter your OTP" },

  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 min-h-screen text-sm">
        <div className="w-20 h-20">
          <img src={logo} alt="logo" className="w-full h-full object-cover border rounded-full" />
        </div>

        <Formik {...formikProps}>
          {({ values }) => (
            <Form className="flex flex-col w-1/4 gap-3 px-6 py-4 border border-gray-400 rounded-md justify-center">
              <h1 className="text-2xl font-bold">Create a new account</h1>

              {formFields.map((field, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <Field
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="border border-gray-400 p-1.5 rounded-md"
                  />
                  <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />

                  {field.name === "mobileNumber" && (
                    <div>
             {/* sample otp */}
                      <button
                        type="button"
                        className="bg-[#fc4c01] w-1/3 text-white p-1.5 rounded-md mt-2"
                        
                      >
                        Send OTP
                      </button>
                    </div>
                  )}
                </div>
              ))}

           



              <div className="flex justify-end">
                <button type="submit" className="bg-[#fc4c01] w-1/3 text-white p-1.5 rounded-md">
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="flex flex-col justify-center items-center gap-1.5">
          <Link to={ROUTE_PATH.SIGNIN} className="text-[#fc4c01] underline">
            Go back
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;

