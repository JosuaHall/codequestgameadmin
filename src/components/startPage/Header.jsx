import React from "react";
import { Link } from "react-router-dom";
import character from "../../assets/character.png";

const Header = () => {
  return (
    <div className="start-screen-header">
      <h1>Code Quest Game - Admin</h1>
      <h3>Manage all the questions for your students</h3>
      <p>
        Below you can add, edit, delete all the questions that will be displayed
        to the students.
      </p>
    </div>
  );
};

export default Header;
