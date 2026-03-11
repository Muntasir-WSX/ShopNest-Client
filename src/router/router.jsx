import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../HomeComponents/Home";
import Signin from "../AuthPages/Signin";
import SignUp from "../AuthPages/SignUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />, 
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
    
    ],
  },
  {
    path: "signin",
    element: <Signin></Signin>
  },
  {
    path: "signup",
    element: <SignUp></SignUp>
  }
]);

export default router;