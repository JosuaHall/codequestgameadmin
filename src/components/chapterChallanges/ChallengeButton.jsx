import React from "react";
import { Link, useLocation } from "react-router-dom";

const ChallengeButton = ({ label, id }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname}/challenge/${id}/${label}`} className="start-button">
      {label}
    </Link>
  );
};

export default ChallengeButton;
