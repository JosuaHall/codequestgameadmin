import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "./../components/common/BackButton";
import {
  fetchQuestionById,
  updateQuestion,
} from "./../actions/questionActions";

const EditQuestion = () => {
  const { chapterId, problemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const question = useSelector((state) => state.questionsReducer.question);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [distractionCode, setDistractionCode] = useState("");

  useEffect(() => {
    // Fetch question details when component mounts
    dispatch(fetchQuestionById(chapterId, problemId));
  }, [dispatch, chapterId, problemId]);

  useEffect(() => {
    // Populate form fields with question data when question is fetched
    if (question) {
      setName(question.name || "");
      setDescription(question.description || "");
      setSolutionCode(formatCodeLines(question.solution_code_lines) || "");
      setDistractionCode(
        formatCodeLines(question.distraction_code_lines) || ""
      );
    }
  }, [question]);

  const handleUpdateQuestion = () => {
    console.log(solutionCode);
    console.log(distractionCode);
    const updatedQuestionData = {
      name,
      description,
      solution_code_lines: formatCodeLinesForDatabase(solutionCode),
      distraction_code_lines: formatCodeLinesForDatabase(distractionCode),
      chapter: parseInt(chapterId),
    };
    console.log(updatedQuestionData);

    // Dispatch update action to Redux
    dispatch(updateQuestion(problemId, updatedQuestionData))
      .then(() => {
        console.log("Question updated successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to update question:", error);
      });
  };

  const formatCodeLines = (code) => {
    if (!code) return "";
    return code.map((line) => line.line_code).join("\n");
  };

  const formatCodeLinesForDatabase = (code) => {
    // Implement logic to split code into lines and format as needed
    return code.split("\n").map((line, index) => ({
      line_nr: index + 1,
      line_code: line.trim(),
    }));
  };

  return (
    <div className="edit-screen">
      <BackButton />
      <h2>{`Edit Question: ${name}`}</h2>
      <h6>Edit the Problem Name</h6>
      <p>This will be the name of the question.</p>
      <input
        type="text"
        placeholder="Question Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      {/* Textarea for problem description */}
      <h6>Edit the Problem Description</h6>
      <p>This will be the explanation of the problem.</p>
      <textarea
        cols="60"
        rows="7"
        placeholder="Question Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        defaultValue={description}
      />
      <br />
      <br />
      {/* Textarea for solution code */}
      <h6>Edit the solution code of the question</h6>
      <p>Reminder: Each line = 1 code snippet</p>
      <textarea
        cols="60"
        rows="7"
        placeholder="Solution Code"
        value={solutionCode}
        onChange={(e) => setSolutionCode(e.target.value)}
        defaultValue={solutionCode}
      />
      <br />
      <br />
      {/* Textarea for distraction lines of code */}
      <h6>Edit the distractor lines of code</h6>
      <textarea
        cols="60"
        rows="7"
        placeholder="Distraction Code"
        value={distractionCode}
        onChange={(e) => setDistractionCode(e.target.value)}
        defaultValue={distractionCode}
      />
      <br />
      <br />
      <button
        className="question-list-item-edit-button"
        onClick={handleUpdateQuestion}
      >
        Update Question
      </button>
    </div>
  );
};

export default EditQuestion;
