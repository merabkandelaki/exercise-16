import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NavBarItem from "../components/NavBar/NavBarItem/NavBarItem";
import Loader from "./Loader";
import { useAuthCont } from "../context/AuthContext";
import "./AppLayout.css";
import Footer from "../components/Footer/Footer";

function AppLayout() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isLoading = navigation.state === "loading";
  const { isAuth, logout } = useAuthCont();

  const handleAuthAction = () => {
    if (isAuth) {
      logout();
      navigate("/"); // Redirect to home on logout
    } else {
      navigate("/auth/login"); // Redirect to login page
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <NavBar>
        <div>
          <NavBarItem title="Home" to="/" />
          <NavBarItem title="Fishes" to="/fishes" />
          <NavBarItem title="About" to="/about" />
          <NavBarItem title="Contact" to="/contact" />
        </div>
        <button className="navbar-login-button" onClick={handleAuthAction}>
          {isAuth ? "Log out" : "Login"}
        </button>
      </NavBar>
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;
