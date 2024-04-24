import React from "react";
import Header from "./../components/startPage/Header";
import QuestionBank from "./../components/startPage/QuestionBank";

const StartPage = () => {
  const openNewWindow = () => {
    window.open("http://localhost:3000", "_blank");
  };
  return (
    <div className="start-page">
      <Header />
      <QuestionBank />

      {/* Absolute-positioned button for opening a new window */}
      <button
        onClick={openNewWindow}
        style={{
          position: "absolute",
          top: "10px", // Adjust top positioning as needed
          right: "10px", // Adjust right positioning as needed
          padding: "10px",
          backgroundColor: "rgb(110, 160, 234)",
          color: "#000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Navigate to the student view
      </button>
    </div>
  );
};

export default StartPage;
