// QuestionListItem.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../actions/questionActions";

const QuestionListItem = ({ chapter, problemId, name }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    dispatch(deleteQuestion(problemId));
    setShowModal(false); // Close the modal after deletion
  };

  return (
    <div className="question-list-item">
      <div>{name}</div>
      <Link
        to={`/chapter/${chapter}/edit/problem/${problemId}`}
        className="question-list-item-edit-button"
      >
        edit
      </Link>

      <button
        onClick={() => setShowModal(true)}
        className="question-list-item-delete-button"
      >
        delete
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this question?</p>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionListItem;
