import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";

export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}
