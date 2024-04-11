import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, Outlet } from "react-router-dom";
import FishCard from "../FishCard/FishCard";
import { getFishes } from "../../services/fishesApi";
import styles from './FishesWrapper.module.css';

export async function fishesLoader() {
  const fishes = await getFishes();

  return fishes;
}

const FishesWrapper = () => {
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const navigate = useNavigate();
  const fishes = useLoaderData();
  const [fishList, setFishList] = useState(fishes);

  useEffect(() => {
    if (triggerRefetch) {
      const fetchData = async () => {
        const fishData = await getFishes();
        setFishList(fishData);
      };
      fetchData();
      setTriggerRefetch(false);
    }
  }, [triggerRefetch]);

  return (
    <div className={styles.fishes_wrapper}>
      <button
        className={styles.create_fish}
        onClick={() => navigate("/fishes/create")}
      >
        Create Fish
      </button>
      <Outlet context={{ setTriggerRefetch }} />
      <div className={styles.fishes_container}>
        {fishList.map((fish, id) => {
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
