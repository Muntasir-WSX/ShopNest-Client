import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../HomeComponents/Home";


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
]);

export default router;