import { Outlet, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import NavBarItem from "../components/NavBar/NavBarItem/NavBarItem";
import Loader from "./Loader";
import AuthContextProvider, {
  useAuthCont,
} from "../components/FishesWrapper/AuthContext";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { isAuth, login, logout } = useAuthCont();
  return (
    <div>
      {isLoading && <Loader />}
      <AuthContextProvider>
        <NavBar>
          <NavBarItem title="Home" to="/" />
          <NavBarItem title="Fishes" to="/fishes" />
          <NavBarItem title="About" to="/about" />
          <NavBarItem title="Contact" to="/contact" />
          {isAuth ? (
            <button onClick={logout}>Log out</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </NavBar>
      </AuthContextProvider>
      <Outlet />
    </div>
  );
}

export default AppLayout;
