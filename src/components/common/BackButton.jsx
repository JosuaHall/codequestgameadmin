import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1); // This will navigate back one step in the history
  };

  return (
    <button className="back-button" onClick={handleClick}>
      Back
    </button>
  );
};

export default BackButton;
