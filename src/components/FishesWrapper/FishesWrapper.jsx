import React, { useReducer, useState } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import FishCard from "../FishCard/FishCard";
import { getFishes } from "../../services/fishesApi";
import "./FishesWrapper.css";
import fishesReducer from "./FishesReducer";

export async function fishesLoader() {
  const fishes = await getFishes();
  return fishes;
}

const FishesWrapper = () => {
  const navigate = useNavigate();
  const fishes = useLoaderData();
  const [fishesState, dispatchFishes] = useReducer(fishesReducer, {
    fishList: fishes,
    loading: false,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFishes = fishesState.fishList.filter((fish) =>
    fish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fishes-wrapper">
      <button
        className="create-fish"
        onClick={() => navigate("/fishes/create")}
      >
        Create Fish
      </button>
      <input
        type="text"
        placeholder="Search fishes..."
        value={searchTerm}
        onChange={handleSearch}
        className="search"
      />
      <Outlet context={{ dispatchFishes, fishesState }} />
      <div className="fishes-container">
        {filteredFishes.map((fish, id) => {
          return (
            <FishCard
              key={id}
              id={fish.id}
              img={fish?.illustrationPhoto?.src || fish?.img}
              name={fish.name}
              region={fish.region}
              scientificName={fish.scientificName}
              onCloseModal={() => navigate("/fishes")}
              dispatchFishes={dispatchFishes}
              loading={fishesState.loading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FishesWrapper;
