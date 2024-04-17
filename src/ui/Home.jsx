import { NavLink } from "react-router-dom";
import { useAuthCont } from "../context/AuthContext";
const Home = () => {
  const { isAuth, user } = useAuthCont();

  return (
    <div className="text-center">
      <h1>Welcome to Fishes App 🐟 {isAuth ? user.firstName : ""}</h1>
      <NavLink to="/fishes">Click on fishes to see all fishes</NavLink>
    </div>
  );
};

export default Home;
