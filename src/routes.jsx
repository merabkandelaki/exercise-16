import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home, { homeLoader } from "./ui/Home";
import Error from "./ui/Error";
import FishesWrapper, {
  fishesLoader,
} from "./components/FishesWrapper/FishesWrapper";
import CreateFishForm from "./components/CreateFishForm/CreateFishForm";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./auth/Login";
import AuthLayout from "./auth/AuthLayout";
import Register from "./auth/Register";
import { authLoader } from "./loaders/auth.loader";



const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <AppLayout />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "/fishes",
        element: <FishesWrapper />,
        loader: fishesLoader,
        errorElement: <Error />,
        children: [
          {
            path: "create",
            element: (
              <PrivateRoute>
                <CreateFishForm />
              </PrivateRoute>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <PrivateRoute>
                <CreateFishForm isEdit={true} />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        loader: authLoader,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
