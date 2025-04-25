import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/logo1.png"
import { ROUTE_PATH } from "../../Router/RoutePath";
const PasswordSetup = () => {

  const [showIcon, setShowIcon] = useState({});

const navigate = useNavigate()
// Yup validation schema
    const validationSchema = Yup.object({
    
      password: Yup.string()
      .min(8,"Password must be at lease 8 characters")

      .matches(/[A-Z]/,"Must contain at lease one uppercase letter")
      .matches(/[0-9]/,"Must contain at lease one number")
      .matches(/\W/,"Must contain at lease one special character")

      


        .required("Password is required"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm your password"),

    });

    const formikProps = {
      initialValues: {
       password : "",
       confirmPassword : ""
      },
      validationSchema,
      onSubmit: (values) => {
        const userData = JSON.parse(localStorage.getItem("user"));

  if (!userData) {
    alert("User info not found. Please complete the previous steps.");
    return;
  }

 
  const completeUser = {
    ...userData,
    password: values.password
  };


  localStorage.setItem("user", JSON.stringify(completeUser));



  console.log("User Registered:", completeUser);
  alert("Account setup complete!");
        console.log("Form Submitted", values);
     
        navigate(ROUTE_PATH.SIGNIN)
      },
    };
   

    const formFields = [
  
     
      
        {
          label: "Password",
          name : "password",
          type: "password",
          placeholder : "Create your password",
          visibility : <FaEye />,
          visibilityOff : <FaEyeSlash/>
        },
        {
            label: "confirm password",
            name : "confirmPassword",
            type: "password",
            
            placeholder : "Re-enter the password",
            visibility : <FaEye />,
            visibilityOff : <FaEyeSlash/>
          },
    
       
    ];

    const toggleVisibility = (index) =>{
        
      setShowIcon((prev)=>({
        ...prev,
        [index] : !showIcon[index]
      }))
    }
    return (
      <>
        <div className="flex flex-col justify-center items-center  gap-4 min-h-screen ">
         
          <div className="w-20 h-20 ">
          <img src={logo} alt="logo" className="w-full h-full object-cover border rounded-full"/>
          </div>
<Formik {...formikProps}>
        <Form className="flex flex-col w-1/4  gap-3 p-10 border border-gray-400 rounded-md">
        <h1 className="text-2xl text-bold">Secure your account</h1>
          {formFields.map((value,index)=>(
   
      
              <div key={index} className="w-full flex flex-col gap-1">
               {/* <label  className="text-lg">{value.label}</label> */}
               <div className="flex items-center relative w-full">
               <Field type={showIcon[index] ? "text" : value.type} placeholder={value.placeholder} name={value.name} className="w-full border border-gray-400 p-1.5 rounded-md" />
            <span className="absolute right-0 p-2 cursor-pointer text-gray-500" onClick={()=>toggleVisibility(index)}>  {showIcon[index] ? value.visibility : value.visibilityOff}</span>
               


               </div>
             <ErrorMessage name={value.name} component="div" className="text-red-500 text-sm"/>
            

               </div>
           
          ))}
           
               <button className="bg-[#fc4c01] text-white p-1 rounded-md" type="submit">Save</button>
          
  
       
         </Form>
         </Formik>
         <div className="flex flex-col justify-center items-center gap-1.5">
          <Link  className="text-[#fc4c01] underline" to={ROUTE_PATH.SIGNIN}>Go to Sign In</Link>
         </div>
  

        
        
        </div>
      </>
    );
  };
  
  export default PasswordSetup;
  
