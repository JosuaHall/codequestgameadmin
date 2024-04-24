import React from "react";
import ChapterButton from "./ChapterButton";
import SubmissionsButton from "./SubmissionsButton";

const QuestionListLabel = ({ chapter }) => {
  return (
    <div className="question-bank-header">
      <h4>{`Week ${chapter}`}</h4>
      <div>
        <SubmissionsButton chapter={chapter} label={"view submissions"} />
        <ChapterButton chapter={chapter} label={"add problem"} />
      </div>
    </div>
  );
};

export default QuestionListLabel;
