import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/logo1.png"
import { ROUTE_PATH } from "../../Router/RoutePath";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
const SignIn= () => {
const navigate = useNavigate()
  const [showIcon, setShowIcon] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState("")
    const formFields = [
     
      {
          label: "Email",
          type: "email",
          placeholder : "Enter your email"
        },
     
      
        {
          label: "Password",
          type: "password",
          placeholder : "Enter your password",
          visibility : <FaEye />,
          visibilityOff : <FaEyeSlash/>
        },
    
       
    ];

// Yup validation schema
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Password is required"),
    });

    const formikProps = {
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        if(!captchaValue){
          setCaptchaError("Please complete the captcha")
          return;
        
        }
        const storedUser = JSON.parse(localStorage.getItem("user"));

    
        if (
          storedUser.email === values.email &&
          storedUser.password === values.password
        ) {
          alert("Login successful!");
      window.open("https://finalty.in/")
     
        } else {
          alert("Invalid email or password");
        }
        console.log("Form Submitted", values);
     
       
      },
    };

    const toggleVisibility = () =>{
      setShowIcon(!showIcon)
    }

    const onChange = (value) => {
      console.log("Captcha value:", value);
      setCaptchaValue(value)
      setCaptchaError("")
    }
    return (
      <>
        <div className="flex flex-col justify-center items-center  gap-4 min-h-screen">
         
          <div className="w-20 h-20 ">
          <img src={logo} alt="logo" className="w-full h-full object-cover border rounded-full"/>
          </div>
<Formik {...formikProps}>
        <Form className="flex flex-col w-full  gap-3 p-10 border border-gray-400 rounded-md max-w-sm mx-auto">
        <h1 className="text-2xl text-bold">Sign In or create account</h1>
          {formFields.map((field,index)=>(
   
      
              <div key={index} className="w-full flex flex-col gap-1">
               {/* <label  className="text-lg">{field.label}</label> */}
               <div className="flex items-center relative w-full">

               <Field type={showIcon ? "text" : field.type} placeholder={field.placeholder}name={field.label.toLowerCase()} className="w-full border border-gray-400 p-1.5 rounded-md"/>
            <span className="absolute right-0 p-2 cursor-pointer text-gray-500" onClick={()=>toggleVisibility()}>  {showIcon ? field.visibility : field.visibilityOff}</span>
               

               </div>
               <ErrorMessage name={field.label.toLowerCase()} component="div" className="text-red-500 text-sm "/>

               </div>
           
          ))}
        <div>
            <ReCAPTCHA
            className="scale-y-75"
    sitekey="6Lc8iiIrAAAAAPD3-Rvr-O6gFemLk5yIHLzFU1Rw"
    onChange={onChange}
  />
  {captchaError && <div className="text-red-500 text-sm ">{captchaError}</div>}
  </div>

 

               <button className="bg-[#fc4c01] text-white p-1 rounded-md" type="submit">Sign In</button>
               <Link className="text-[#fc4c01] underline" to={ROUTE_PATH.FORGOT_PASSWORD}>Forgot password?</Link>
          
  
       
         </Form>
         </Formik>
         <div className="flex flex-col justify-center items-center gap-1.5">
          <p className="text-[#fc4c01]">Don't have an account?</p>
          <Link  className="text-[#fc4c01] underline" to={ROUTE_PATH.SIGNUP}>Sign up</Link>
          <Link  className="text-[#fc4c01] underline" to={ROUTE_PATH.MODAL}>Go back</Link>


         </div>
        </div>
      </>
    );
  };
  
  export default SignIn;
  