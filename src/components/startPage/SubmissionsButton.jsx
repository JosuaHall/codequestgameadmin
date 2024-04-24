import React from "react";
import { Link } from "react-router-dom";

const SubmissionsButton = ({ chapter, label }) => {
  return (
    <Link
      to={`/chapter/${chapter}/view/submissions`}
      className="submission-button"
    >
      {label}
    </Link>
  );
};

export default SubmissionsButton;
