import React from "react";
import { Link } from "react-router-dom";

const ChapterButton = ({ chapter, label }) => {
  return (
    <Link to={`/chapter/${chapter}/add/problem`} className="start-button">
      {label}
    </Link>
  );
};

export default ChapterButton;
