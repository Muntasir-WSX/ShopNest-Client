import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../HomeComponents/Home";
import Signin from "../AuthPages/Signin";
import SignUp from "../AuthPages/SignUp";
import BlogsMain from "../OtherPages/BlogsMain/BlogsMain";
import FAQMain from "../OtherPages/FAQMain/FAQMain";
import ShopLayout from "../OtherPages/ShopMain/Shoplayout";
import ErrorPage from "../Shared Components/Error/ErrorPage";
import AboutUs from "../OtherPages/AboutUs/AboutUs";
import BlogsDetails from "../OtherPages/BlogsMain/BlogsDetails";
import PrivateRoutes from "../Routes/PrivateRoutes";
import ShopDetails from "../OtherPages/ShopMain/ShopDetails";
import Wishlist from "../OtherPages/ShopMain/Wishlist/Wishlist";
import Cart from "../OtherPages/Cart/CartMain/Cart";
import CheckOutForm from "../OtherPages/Cart/CartMain/CheckOutForm";
import SuccessPage from "../OtherPages/Cart/CartMain/successPage";
import TrackingOrder from "../OtherPages/Tracking/TrackingOrder";

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
          path:"/shopdetails/:id",
          element:<ShopDetails></ShopDetails>
      },
      {
        path:"/wishlist",
        element: <PrivateRoutes><Wishlist></Wishlist></PrivateRoutes>
      },
      {
          path:"/track",
          element: <PrivateRoutes><TrackingOrder></TrackingOrder></PrivateRoutes>
      },
      {
          path:"checkoutform",
          element:<PrivateRoutes><CheckOutForm></CheckOutForm></PrivateRoutes>
      },
      {
          path: "/cart",
          element:<PrivateRoutes><Cart></Cart></PrivateRoutes>
      },
      {
          path:"payment/success/:tranId",
          element: <SuccessPage></SuccessPage>
      },
      {
          path: "payment/fail",
          element: <div className="text-center py-20 text-red-500">Payment Failed! Try Again.</div>
      },
      {
        path: "/blogs",
        element: <BlogsMain />
      },
      {
          path:"/blogsDetails/:id",
          element: <PrivateRoutes><BlogsDetails></BlogsDetails></PrivateRoutes> 
      },
      {
        path: "faq",
        element: <FAQMain />
      },
      {
        path: "/about",
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