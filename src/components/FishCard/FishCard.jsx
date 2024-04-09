import { useEffect, useState } from "react";
import "./FishCard.css";
import Modal from "../Modal/Modal";
import { getSingleFish } from "../../services/fishesApi";
import { useNavigate, useParams } from 'react-router-dom';

const FishCard = ({ img, name, region, scientificName, id }) => {
  const { id: idParam } = useParams();

  const navigate = useNavigate();

  const [selectedFish, setSelectedFish] = useState();
  const getFish = async () => {
    if (!idParam) return;

    const matchedFish = await getSingleFish(idParam);
    console.log(matchedFish);
    if (matchedFish) setSelectedFish(matchedFish);
  };

  useEffect(() => {
    getFish();
  }, []);

  const [isShowing, setIsShowing] = useState(false);
  const [stars, setStars] = useState(0);

  const showFish = () => {
    if (idParam) {
      setIsShowing(true);
    } else {
      navigate(`/fishes/${id}`);
    }
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
      <div className="fish">
        <img
          className="img"
          src={img || selectedFish?.illustrationPhoto?.src}
          alt={name || selectedFish?.name}
        />
        <div className="description">
          <p className="description-title">
            Name: {name || selectedFish?.name}
          </p>
          <p className="description-title">
            Region: {region || selectedFish?.region}
          </p>
          <p className="description-title">
            Scientificname: {scientificName || selectedFish?.scientificName}
          </p>
          <button className="show" onClick={() => showFish()}>
            Show
          </button>
        </div>
      </div>

      {isShowing && (
        <Modal onClose={() => setIsShowing(false)}>
          <img
            src={img || selectedFish?.illustrationPhoto?.src}
            alt={name || selectedFish?.name}
          ></img>
          <p className="modal-name">Name: {name || selectedFish?.name}</p>
          <span className="stars">
            Stars: {renderStars()}
            <span className="emoji-star">{stars}</span>
            <button
              className="like"
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
