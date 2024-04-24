import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionListLabel from "./QuestionListLabel";
import QuestionListItem from "./QuestionListItem";
import { fetchQuestionsByChapter } from "../../actions/questionActions";

const QuestionsList = () => {
  const dispatch = useDispatch();
  const questionsByChapter = useSelector(
    (state) => state.questionsReducer.questionsByChapter
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchQuestionsByChapter());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching questions by chapter:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        [...Array(14).keys()].map((chapter) => {
          const chapterNumber = chapter + 1; // Convert index (0-based) to chapter number (1-based)
          const chapterKey = `chapter-${chapterNumber}`;

          return (
            <div key={chapterKey}>
              <QuestionListLabel chapter={chapterNumber} />
              {questionsByChapter[chapterNumber] &&
              questionsByChapter[chapterNumber].length > 0 ? (
                questionsByChapter[chapterNumber].map((question) => (
                  <QuestionListItem
                    key={question._id}
                    chapter={chapterNumber}
                    problemId={question._id}
                    name={question.name}
                  />
                ))
              ) : (
                <div style={{ textAlign: "left" }}>No problems listed</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default QuestionsList;
