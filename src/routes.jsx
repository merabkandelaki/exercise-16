import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import FishesWrapper, {
  fishesLoader,
} from "./components/FishesWrapper/FishesWrapper";
import CreateFishForm from "./components/CreateFishForm/CreateFishForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
        ],
      },
    ],
  },
]);

export default router;
