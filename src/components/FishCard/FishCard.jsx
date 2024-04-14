import { useState } from "react";
import Modal from "../Modal/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteFish, updateFish } from '../../services/fishesApi';
import styles from './FishCard.module.css';

const FishCard = ({
  img,
  name,
  region,
  scientificName,
  id,
  onCloseModal,
  dispatchFishes,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const fishIdQueryParam = searchParams.get("id");

  const [isShowing, setIsShowing] = useState(
    fishIdQueryParam === id.toString()
  );
  const [stars, setStars] = useState(0);

  const showFish = () => {
    setIsShowing(true);
    setSearchParams({ id });
  };

  const closeModal = () => {
    setIsShowing(false);
    onCloseModal();
    setSearchParams({});
  };

  const handleStarClick = () => {
    setStars(stars + 1);
  };
  const renderStars = () => {
    let starIcons = "";
    for (let i = 0; i < stars; i++) {
      starIcons += "⭐";
    }
    return starIcons;
  };

  const handleDelete = async () => {
    try {
      await deleteFish(id);
      dispatchFishes({ type: "REMOVE_FISH", payload: id });
    } catch (error) {
      console.error('Error deleting fish:', error);
    }
  };
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      const updatedFish = await updateFish(id, {
        name,
        region,
        scientificName,
        img,
      });
      dispatchFishes({ type: "UPDATE_FISH", payload: updatedFish });
      navigate(`/fishes/edit/${id}`);
    } catch (error) {
      console.error("Failed to update fish", error);
    }
  };

  return (
    <>
      <div className={styles.fish}>
        <img className={styles.img} src={img} alt={name} />
        <div className={styles.description}>
          <p className={styles.description_title}>Name: {name}</p>
          <p className={styles.description_title}>Region: {region}</p>
          <p className={styles.description_title}>
            Scientificname: {scientificName}
          </p>
          <div className={styles.buttons}>
            <button className={styles.show} onClick={() => showFish()}>
              Show
            </button>
            <button className={styles.edit} onClick={handleEdit}>
              Edit
            </button>
            <button className={styles.delete} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {isShowing && (
        <Modal onClose={() => closeModal()}>
          <img src={img} alt={name}></img>
          <p className={styles.modal_name}>Name: {name}</p>
          <span className={styles.stars}>
            Stars: {renderStars()}
            <span className={styles.emoji_star}>{stars}</span>
            <button
              className={styles.like}
              onClick={() => {
                if (stars < 10) {
                  handleStarClick();
                }
              }}
            >
              👍
            </button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default FishCard;
