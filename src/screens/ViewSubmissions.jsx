import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSubmissions,
  resetSubmissionsOfChapter,
} from "../actions/questionActions";
import BackButton from "../components/common/BackButton";

const ViewSubmissions = () => {
  const { chapter } = useParams();
  const dispatch = useDispatch();

  const { loading, submissions, error, deletedSubmissions } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    dispatch(fetchSubmissions(chapter));
  }, [dispatch, chapter, deletedSubmissions]);

  // Function to format UTC date to CST
  const formatToCST = (utcDate) => {
    const options = {
      timeZone: "America/Chicago",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(utcDate).toLocaleString("en-US", options);
  };

  const handleReset = () => {
    dispatch(resetSubmissionsOfChapter(chapter));
  };

  return (
    <div>
      <h2>Submissions for Chapter {chapter}</h2>
      <button onClick={() => handleReset()} className="submission-button">
        Reset Submissions for chapter {chapter}
      </button>
      <BackButton />

      {loading && <p>Loading submissions...</p>}
      {error && <p>Error: {error}</p>}

      {submissions && submissions.length > 0 && (
        <ul className="submission-list">
          {submissions.map((submission) => (
            <li key={submission._id} className="submission-list-item">
              <b>Name:</b> {submission.name}, <b>Student ID:</b>{" "}
              {submission.student_id}, <b>Date and Time:</b>{" "}
              {formatToCST(submission.register_date)}
            </li>
          ))}
        </ul>
      )}

      {submissions && submissions.length === 0 && <p>No submissions found.</p>}
    </div>
  );
};

export default ViewSubmissions;
