import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/admin/home";
import Login from "../pages/login";
import { ProtectedRoutes, PublicRoutes } from "./RouteGuard";

export default function Routes() {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <Home />,
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
