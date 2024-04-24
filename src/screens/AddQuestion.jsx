import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "./../components/common/BackButton";
import {
  createQuestion,
  fetchDistractorLines,
} from "./../actions/questionActions"; // Import your Redux action

const AddQuestion = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { distractorLines, loading, error } = useSelector(
    (state) => state.distractorLines
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [solutionCode, setSolutionCode] = useState("");
  const [distractionCode, setDistractionCode] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [solutionCodeError, setSolutionCodeError] = useState("");

  useEffect(() => {
    dispatch(fetchDistractorLines());
  }, [dispatch]);

  const handleCreateQuestion = () => {
    // Validate fields
    if (!name.trim()) {
      setNameError("Name is required");
      return;
    }
    if (!description.trim()) {
      setDescriptionError("Description is required");
      return;
    }
    if (!solutionCode.trim()) {
      setSolutionCodeError("Solution code is required");
      return;
    }

    // Reset error messages
    setNameError("");
    setDescriptionError("");
    setSolutionCodeError("");

    const questionData = {
      name,
      description,
      solution_code_lines: formatCodeLines(solutionCode),
      distraction_code_lines: formatCodeLines(distractionCode),
      chapter: parseInt(chapterId),
    };

    dispatch(createQuestion(questionData))
      .then(() => {
        console.log("Success! Navigating back to homepage.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to create question:", error);
      });
  };

  const formatCodeLines = (code) => {
    return code.split("\n").map((line, index) => ({
      line_nr: index + 1,
      line_code: line.trim(),
    }));
  };

  const handleSelectOption = (option) => {
    const updatedCode =
      distractionCode + (distractionCode ? "\n" : "") + option;
    setDistractionCode(updatedCode);
  };

  return (
    <div className="add-question-screen">
      <BackButton />
      <h2>{`Add a Question to Chapter ${chapterId}`}</h2>
      <p>In the following you can create your own question</p>

      {/* Input for question name */}
      <h6>Type in Problem Name</h6>
      <p>This will be the name of the question.</p>
      <input
        type="text"
        placeholder="e.g. For-Loops"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <p className="error">{nameError}</p>}
      <br />
      <br />

      {/* Textarea for problem description */}
      <h6>Type in the Problem Description</h6>
      <p>This will be the explanation of the problem.</p>
      <textarea
        cols="60"
        rows="7"
        placeholder="Problem description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      {descriptionError && <p className="error">{descriptionError}</p>}
      <br />
      <br />

      {/* Textarea for solution code */}
      <h6>Type in the solution code of the question</h6>
      <p>Reminder: Each line = 1 code snippet</p>
      <p>Blank lines can also be valid snippets</p>
      <textarea
        cols="60"
        rows="7"
        placeholder="Solution snippets (correct program code)"
        value={solutionCode}
        onChange={(e) => setSolutionCode(e.target.value)}
      ></textarea>
      {solutionCodeError && <p className="error">{solutionCodeError}</p>}
      <br />
      <br />

      {/* Textarea for distraction lines of code */}
      <h6>
        Type in some distractor lines of code or select from the previous used
        distractor lines
      </h6>
      <p>Reminder: Each line = 1 code snippet</p>
      {/* Dropdown for distraction code options */}
      <div>
        <div>
          <p>Select an item to add to the distractor code.</p>
        </div>
        <div>
          <select onChange={(e) => handleSelectOption(e.target.value)}>
            <option value="">Choose an option...</option>
            {distractorLines.map((option) => (
              <option key={option._id} value={option.line_code}>
                {option.line_code}
              </option>
            ))}
          </select>
        </div>
        <div>or type in the distractor code.</div>
      </div>
      <textarea
        cols="60"
        rows="7"
        placeholder="Distraction snippets"
        value={distractionCode}
        onChange={(e) => setDistractionCode(e.target.value)}
      ></textarea>
      <br />
      <br />

      {/* "Create Question" button */}
      <button
        className="question-list-item-edit-button"
        onClick={handleCreateQuestion}
      >
        Create Question
      </button>
    </div>
  );
};

export default AddQuestion;
