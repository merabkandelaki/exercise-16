import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NavBarItem from "../components/NavBar/NavBarItem/NavBarItem";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div>
      {isLoading && <Loader />}
      <NavBar>
        <NavBarItem title="Home" to="/" />
        <NavBarItem title="Fishes" to="/fishes" />
        <NavBarItem title="About" to="/about" />
        <NavBarItem title="Contact" to="/contact" />
      </NavBar>
      <Outlet />
    </div>
  );
}

export default AppLayout;
