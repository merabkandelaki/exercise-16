import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import FishesWrapper, {
  fishesLoader,
} from "./components/FishesWrapper/FishesWrapper";
import FishCard from "./components/FishCard/FishCard";

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
      },
      {
        path: "/fishes/:id",
        element: <FishCard />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
