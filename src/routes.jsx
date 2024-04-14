import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import FishesWrapper, {
  fishesLoader,
} from "./components/FishesWrapper/FishesWrapper";
import CreateFishForm from "./components/CreateFishForm/CreateFishForm";
import AuthContextProvider from "./components/FishesWrapper/AuthContext";

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
      },
      {
        path: "/fishes",
        element: <FishesWrapper />,
        loader: fishesLoader,
        errorElement: <Error />,
        children: [
          {
            path: "create",
            element: <CreateFishForm />,
          },
          {
            path: "edit/:id",
            element: <CreateFishForm isEdit={true} />,
          },
        ],
      },
    ],
  },
]);

export default router;
