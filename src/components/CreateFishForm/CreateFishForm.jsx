import React, { useState } from 'react';
import "./CreateFishForm.css";

const CreateFishForm = ({ onFishSubmit }) => {
  const [fishForm, setFishForm] = useState({
    region: "",
    scientificName: "",
    name: "",
    img: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFishForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (!Object.keys(errors).length) {
      onFishSubmit(fishForm);
      // Reset form
      setFishForm({
        region: "",
        scientificName: "",
        name: "",
        img: "",
      });
    } else {
      console.log("Form is invalid");
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

  return (
    <form onSubmit={handleSubmit} className="create-fish-form">
      <label className="create-fish-form-label">
        Region:
        <input
          type="text"
          name="region"
          value={fishForm.region}
          onChange={handleChange}
          className="create-fish-form-input"
        />
      </label>
      {formErrors.region && (
        <span className="create-fish-form-error">
          {formErrors.region}
        </span>
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
          <span className="create-fish-form-error">
            {formErrors.name}
          </span>
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
          <span className="create-fish-form-error">
            {formErrors.img}
          </span>
        )}
      </label>
      <br />
      <br />
      <button type="submit" className="create-fish-form-button">
        Create Fish
      </button>
    </form>
  );
};

export default CreateFishForm;