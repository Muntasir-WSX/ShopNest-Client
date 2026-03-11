import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import AuthProvider from "./Context/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#333', 
          color: '#fff',
          borderRadius: '10px',
        },
      }}
    />
  </AuthProvider>
  </StrictMode>
);