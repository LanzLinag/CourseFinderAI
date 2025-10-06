import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseAdvisorScreen from "./screens/CourseAdvisorScreen";

function App() {
  return (
    <Router>
      <Routes>
        {/* You can add more routes later if needed */}
        <Route path="/" element={<CourseAdvisorScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
