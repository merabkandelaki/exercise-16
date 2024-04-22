import { useAuthCont } from "../context/AuthContext";
import FishCard from "../components/FishCard/FishCard";
import { useLoaderData } from "react-router-dom";
import { fishesLoader } from "../components/FishesWrapper/FishesWrapper";
import './Home.css';

const Home = () => {
  const { isAuth, user } = useAuthCont();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  const fishes = useLoaderData() || [];

  return (
    <div className="home">
      <h1 className="home-title">Welcome to Fishes App 🐟 {isAuth ? user.firstName : ""}</h1>
      {favorites.length > 0 ? (
        <div className="favorite-fishes">
          <h2 className="home-title-favorites">Your Favorite Fishes:</h2>
          <div className="favorite-fishes-container">
            {favorites.map((fishId) => {
              const fish = fishes.find((f) => f.id === fishId);
              return fish ? (
                <FishCard
                  key={fish.id}
                  id={fish.id}
                  img={fish?.illustrationPhoto?.src || fish?.img}
                  name={fish.name}
                  region={fish.region}
                  scientificName={fish.scientificName}
                />
              ) : null;
            })}
          </div>
        </div>
      ) : (
        <p>You don't have any favorite fishes yet.</p>
      )}
    </div>
  );
};

export default Home;
export const homeLoader = fishesLoader;
