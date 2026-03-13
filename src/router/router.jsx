import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../HomeComponents/Home";
import Signin from "../AuthPages/Signin";
import SignUp from "../AuthPages/SignUp";
import AboutUs from "../OtherPages/AboutUs/AboutUs";
import BlogsMain from "../OtherPages/BlogsMain/BlogsMain";
import FAQMain from "../OtherPages/FAQMain/FAQMain";
import ShopLayout from "../OtherPages/ShopMain/Shoplayout";
import ErrorPage from "../Shared Components/Error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <Home />
      },
      {
        path: "shop",
        element: <ShopLayout />
      },
      {
        path: "blogs",
        element: <BlogsMain />
      },
      {
        path: "faq",
        element: <FAQMain />
      },
      {
        path: "about",
        element: <AboutUs />
      },
    ],
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "*", 
    element: <ErrorPage />
  }
]);

export default router;