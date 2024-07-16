import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/admin/home";
import Login from "../pages/login";
import { ProtectedRoutes, PublicRoutes } from "./RouteGuard";
import VerificatorHome from "../pages/verificator/home";
import UserHome from "../pages/user/home";
import RegisterUser from "../pages/register-user";

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/verificator",
          element: <VerificatorHome />,
        },
        {
          path: "/user",
          element: <UserHome />,
        },
      ],
    },
    {
      element: <PublicRoutes />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <RegisterUser />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
