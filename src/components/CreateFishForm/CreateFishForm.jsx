import React, { useEffect, useRef, useState } from 'react';
import "./CreateFishForm.css";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import Modal from '../Modal/Modal';
import { createFish, updateFish } from "../../services/fishesApi";

const CreateFishForm = ({ isEdit = false }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { dispatchFishes, fishesState } = useOutletContext();

  const valueInputRef = useRef(null);
  useEffect(() => {
    valueInputRef.current.focus();
  }, []);

  const [fishForm, setFishForm] = useState({
    id: id || Math.random() + "",
    region: "",
    scientificName: "",
    name: "",
    img: "",
  });

  useEffect(() => {
    if (isEdit) {
      const existingFish = fishesState.fishList.find((fish) => fish.id === id);
      if (existingFish) {
        setFishForm(existingFish);
      }
    }
  }, [isEdit, id, fishesState.fishList]);

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatchFishes({ type: "LOADING", payload: true });
    const errors = validateForm();
    setFormErrors(errors);

    if (!Object.keys(errors).length) {
      try {
        let updatedFish;
        if (isEdit) {
          updatedFish = await updateFish(fishForm.id, fishForm);
          dispatchFishes({ type: "UPDATE_FISH", payload: updatedFish });
        } else {
          updatedFish = await createFish(fishForm);
          dispatchFishes({ type: "ADD_FISH", payload: updatedFish });
          dispatchFishes({ type: "LOADING", payload: false });
        }
        console.log(isEdit ? "Updated Fish" : "New Created Fish", updatedFish);
        navigate("/fishes");
      } catch (error) {
        console.error(
          isEdit ? "Failed to update fish" : "Failed to create fish",
          error
        );
        dispatchFishes({ type: "LOADING", payload: false });
      }
      setFishForm({
        id: Math.random() + "",
        region: "",
        scientificName: "",
        name: "",
        img: "",
      });
      dispatchFishes({ type: "LOADING", payload: false });
    } else {
      console.log("Form is invalid");
      dispatchFishes({ type: "LOADING", payload: false });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (fishForm.region.trim() === "") {
      errors.region = "Region is required!";
    }

    if (fishForm.scientificName.trim() === "") {
      errors.scientificName = "ScientificName is required!";
    }

    if (fishForm.name.trim() === "") {
      errors.name = "Name is required!";
    }

    if (fishForm.img.trim() === "") {
      errors.img = "Image URL is required!";
    }

    return errors;
  };

  const handleClose = () => {
    navigate("/fishes");
  };

  return (
    <Modal onClose={() => handleClose()}>
      <form onSubmit={handleSubmit} className="create-fish-form">
        <label className="create-fish-form-label">
          Region:
          <input
            type="text"
            name="region"
            value={fishForm.region}
            onChange={handleChange}
            ref={valueInputRef}
            className="create-fish-form-input"
          />
        </label>
        {formErrors.region && (
          <span className="create-fish-form-error">{formErrors.region}</span>
        )}
        <br />
        <br />
        <label className="create-fish-form-label">
          ScientificName:
          <input
            type="text"
            name="scientificName"
            value={fishForm.scientificName}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.scientificName && (
            <span className="create-fish-form-error">
              {formErrors.scientificName}
            </span>
          )}
        </label>
        <br />
        <br />
        <label className="create-fish-form-label">
          Name:
          <input
            type="text"
            name="name"
            value={fishForm.name}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.name && (
            <span className="create-fish-form-error">{formErrors.name}</span>
          )}
        </label>
        <br />
        <br />
        <label className="create-fish-form-label">
          Image URL:
          <input
            type="text"
            name="img"
            value={fishForm.img}
            onChange={handleChange}
            className="create-fish-form-input"
          />
          {formErrors.img && (
            <span className="create-fish-form-error">{formErrors.img}</span>
          )}
        </label>
        <br />
        <br />
        {fishesState.loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <button type="submit" className="create-fish-form-button">
            {isEdit ? "Update Fish" : "Create Fish"}
          </button>
        )}
      </form>
    </Modal>
  );
};

export default CreateFishForm;
