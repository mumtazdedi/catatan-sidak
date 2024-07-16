import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/admin/home";
import Login from "../pages/login";
import { ProtectedRoutes, PublicRoutes } from "./RouteGuard";
import VerificatorHome from "../pages/verificator/home";

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
