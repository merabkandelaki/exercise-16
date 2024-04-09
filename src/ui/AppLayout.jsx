import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NavBarItem from "../components/NavBar/NavBarItem/NavBarItem";

function AppLayout() {
  return (
    <div className="App">
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
