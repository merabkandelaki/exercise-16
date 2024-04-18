import axios from 'axios';
import { useState } from "react";
import Modal from "../Modal/Modal";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from './FishCard.module.css';
import { useAuthCont } from '../../context/AuthContext';

const API_URL = "http://localhost:9000";

const FishCard = ({
  img,
  name,
  region,
  scientificName,
  id,
  onCloseModal,
  dispatchFishes,
  loading: globalLoading,
}) => {
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuthCont();

  const [searchParams, setSearchParams] = useSearchParams();

  const { id: queryId } = useParams();
  const fishIdQueryParam = searchParams.get("id");

  const [isShowing, setIsShowing] = useState(
    fishIdQueryParam === id?.toString() || queryId === id?.toString()
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
    if (!isAuth) {
      navigate("/auth/login");
      return;
    }
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/fishes/${id}`);
      dispatchFishes({ type: "REMOVE_FISH", payload: id });
      setLoading(false);
    } catch (error) {
      console.error('Error deleting fish:', error);
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      setLoading(true);
      const { data: updatedFish } = await axios.put(`${API_URL}/fishes/${id}`, {
        name,
        region,
        scientificName,
        img,
      });
      dispatchFishes({ type: "UPDATE_FISH", payload: updatedFish });
      navigate(`/fishes/edit/${id}`);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update fish", error);
      setLoading(false);
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
            {loading || globalLoading ? (
              <div className={styles.loading_delete}>
                <div className={styles.loading_spinner}></div>
              </div>
            ) : (
              <button className={styles.delete} onClick={handleDelete}>
                Delete
              </button>
            )}
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
