import { ROUTE_PATH } from "./RoutePath";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import KeyPeople from "../components/pages/Keypeople";
import ServicesSection from "../components/pages/Service";
import Contact from "../components/pages/Contact";
import Layout from "../components/pages/layout";
import { BasicModal as Model } from "../components/pages/model";
import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import PasswordSetup from "../components/pages/passwordSetup";
import ToDo from "../components/pages/ToDo";
import ForgotPassword from "../components/pages/ForgotPassword";
import ResetPassword from "../components/pages/ResetPassword";

export const routes = [
  {
    path: ROUTE_PATH.LAYOUT, 
    element: <Layout/>,
    children: [
      {
        path : ROUTE_PATH.HOME,       
        element: <Home />,
      },
      {
        path : ROUTE_PATH.ABOUT,
        element: <About/>,
      },
      {
        path : ROUTE_PATH.KEY_PEOPLE,
        element: <KeyPeople/>,
      },
      {
        path : ROUTE_PATH.SERVICES,
        element: <ServicesSection/>,
      },
      {
        path : ROUTE_PATH.CONTACT,
        element: <Contact/>,
      },
    
      {
        path : ROUTE_PATH.NO_MATCH,
        element : <div>NO page found</div>
      }
    ]
  },
  {
    path : ROUTE_PATH.SIGNIN,
    element: <SignIn/>,
  },
  {
    path : ROUTE_PATH.SIGNUP,
    element: <SignUp/>,
  },
  {
    path : ROUTE_PATH.PASSWORD_SETUP,
    element: <PasswordSetup/>,
  },
  {
    path : ROUTE_PATH.TO_DO,
    element: <ToDo/>,
  },
  {
    path : ROUTE_PATH.FORGOT_PASSWORD,
    element: <ForgotPassword/>,
  },
  {
    path : ROUTE_PATH.RESET_PASSWORD,
    element: <ResetPassword/>,
  },
]







