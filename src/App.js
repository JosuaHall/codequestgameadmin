import React from "react";
import { Routes, Route } from "react-router-dom";
import StartPage from "./screens/StartPage";
import NotFoundPage from "./screens/NotFoundPage";
import EditQuestion from "./screens/EditQuestion";
import AddQuestion from "./screens/AddQuestion";
import ViewSubmissions from "./screens/ViewSubmissions";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/chapter/:chapterId/edit/problem/:problemId"
          element={<EditQuestion />}
        />
        <Route
          path="/chapter/:chapterId/add/problem"
          element={<AddQuestion />}
        ></Route>
        <Route
          path="/chapter/:chapter/view/submissions"
          element={<ViewSubmissions />}
        ></Route>

        <Route path="/" element={<StartPage />} />
        <Route path="" element={<StartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
