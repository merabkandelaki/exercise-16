import React, { useReducer } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import FishCard from "../FishCard/FishCard";
import { getFishes } from "../../services/fishesApi";
import styles from './FishesWrapper.module.css';
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

  return (
    <div className={styles.fishes_wrapper}>
      {fishesState.loading && <div className={styles.loading_fish}>Loading...</div>}
      <button
        className={styles.create_fish}
        onClick={() => navigate("/fishes/create")}
      >
        Create Fish
      </button>
      <Outlet context={{ dispatchFishes }} />
      <div className={styles.fishes_container}>
        {fishesState.fishList.map((fish, id) => {
          return (
            <FishCard
              key={id}
              id={fish.id}
              img={fish?.illustrationPhoto?.src || fish?.img}
              name={fish.name}
              region={fish.region}
              scientificName={fish.scientificName}
              onCloseModal={() => navigate("/fishes")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FishesWrapper;
