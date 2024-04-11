import { useState } from "react";
import Modal from "../Modal/Modal";
import { useSearchParams } from "react-router-dom";
import styles from './FishCard.module.css';

const FishCard = ({ img, name, region, scientificName, id, onCloseModal }) => {
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
          <button className={styles.show} onClick={() => showFish()}>
            Show
          </button>
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
