import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../HomeComponents/Home";
import Signin from "../AuthPages/Signin";
import SignUp from "../AuthPages/SignUp";
import ShopMain from "../OtherPages/ShopMain/ShopMain";
import AboutUs from "../OtherPages/AboutUs/AboutUs";
import BlogsMain from "../OtherPages/BlogsMain/BlogsMain";
import FAQMain from "../OtherPages/FAQMain/FAQMain";
import ShopLayout from "../OtherPages/ShopMain/Shoplayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />, 
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path:"/shop",
        element:<ShopLayout></ShopLayout>
      },
      {
        path:"/blogs",
        element:<BlogsMain></BlogsMain>
      },
      {
        path:"/faq",
        element:<FAQMain></FAQMain>
      },
      {
        path:"/about",
        element:<AboutUs></AboutUs>
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