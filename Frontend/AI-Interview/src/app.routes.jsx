import { createBrowserRouter } from "react-router-dom";
import Login from "./features/Auth/pages/login";
import Register from "./features/Auth/pages/register";
import HomePage from "./features/Auth/pages/home";
import Protected from "./features/Auth/components/protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <HomePage />
      </Protected>
    )
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