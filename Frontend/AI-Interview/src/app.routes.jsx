import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Auth/pages/login";
import Register from "./features/Auth/pages/register";
import HomePage from "./features/Auth/pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "*",
    element: <div className="min-h-screen flex items-center justify-center text-white">Page not found</div>
  }
]);