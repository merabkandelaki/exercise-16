import axios from 'axios';
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAuthCont } from '../../context/AuthContext';
import './FishCard.css';

const API_URL = "http://localhost:9000";

const FishCard = ({
  img,
  name,
  region,
  scientificName,
  id,
  dispatchFishes,
  loading: globalLoading,
  isHomePage = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuthCont();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: queryId } = useParams();
  const fishIdQueryParam = searchParams.get("id");
  const [isShowing, setIsShowing] = useState(false);
  const [stars, setStars] = useState(0);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(id));

    if (isHomePage && favorites.includes(id)) {
      setIsShowing(true);
    } else {
      setIsShowing(
        fishIdQueryParam === id?.toString() || queryId === id?.toString()
      );
    }
  }, [id, isHomePage, fishIdQueryParam, queryId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId) => favId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  const closeModal = () => {
    setIsShowing(false);
    setSearchParams({});
  };

  const handleStarClick = async () => {
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
    navigate(`/fishes/edit/${id}`);
  };

  return (
    <>
      <div className="fish" onClick={() => setIsShowing(true)}>
        <button
          className="button-favorit"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
        <img className="img" src={img} alt={name} />
        <div className="description">
          <p className="description-title">Name: {name}</p>
          <p className="description-title">Region: {region}</p>
          <p className="description-title">Scientificname: {scientificName}</p>
          <div className="buttons">
            {isAuth && !isFavorite && (
              <>
                <button
                  className="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                >
                  Edit
                </button>
                {loading || globalLoading ? (
                  <div className="loading-delete">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <button
                    className="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    Delete
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {isShowing && (
        <Modal onClose={closeModal}>
          <img src={img} alt={name}></img>
          <p className="modal-name">Name: {name}</p>
          <span className="stars">
            Stars: {renderStars()}
            <span className="emoji-star">{stars}</span>
            <button className="like" onClick={handleStarClick}>
              👍
            </button>
          </span>
        </Modal>
      )}
    </>
  );
};

export default FishCard;
