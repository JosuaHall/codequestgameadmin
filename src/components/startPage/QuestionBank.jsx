import React from "react";
import ChapterButton from "./ChapterButton";
import QuestionsList from "./QuestionsList";

const QuestionBank = () => {
  return (
    <div className="question-bank-container">
      <h5>Question Bank</h5>

      <QuestionsList />
    </div>
  );
};

export default QuestionBank;
