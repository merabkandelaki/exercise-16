import React, { useState } from "react";
import FishCard from "../FishCard/FishCard";
import "./FishesWrapper.css";
import Modal from "../Modal/Modal";
import CreateFishForm from "../CreateFishForm/CreateFishForm";
import { useLoaderData } from "react-router-dom";
import { getFishes } from "../../services/fishesApi";

export async function fishesLoader() {
  const fishes = await getFishes();

  return fishes;
}

const FishesWrapper = () => {
  const fishes = useLoaderData();

  const [createFish, setCreateFish] = useState(false);
  const [fishList, setFishList] = useState(fishes);

  const handleFishSubmit = (fish) => {
    if (fish) {
      setFishList((prevFishes) => {
        return [...prevFishes, fish];
      });
      setCreateFish(false);
    }
  };
  console.log("fishes", fishes);

  return (
    <div className="fishes-wrapper">
      <button className="create-fish" onClick={() => setCreateFish(true)}>Create Fish</button>
      {createFish && (
        <Modal onClose={() => setCreateFish(false)}>
          <CreateFishForm onFishSubmit={handleFishSubmit} />
        </Modal>
      )}
      <div className="fishes-container">
        {fishList.map((fish, id) => {
          return (
            <FishCard
              key={id}
              id={fish.id}
              img={fish?.illustrationPhoto?.src || fish?.img}
              name={fish.name}
              region={fish.region}
              scientificName={fish.scientificName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FishesWrapper;
