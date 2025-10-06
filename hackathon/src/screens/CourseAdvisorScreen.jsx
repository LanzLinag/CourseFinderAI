import React from "react";
import CourseAdvisorUI from "../components/CourseAdvisorUI";
import "../css/courseAdvisorScreen.css";

function CourseAdvisorScreen() {
  return (
    <div className="advisor-screen-container">
      <div className="advisor-screen-content">
        <h2 className="advisor-screen-title">🎓 College Course Finder (Philippines)</h2>
        <p className="advisor-screen-subtitle">
          Enter your hobbies, favorite subject, and preferred work setting — the AI will suggest
          the best college course for you and explain why it fits.
        </p>
        <CourseAdvisorUI />
      </div>
    </div>
  );
}

export default CourseAdvisorScreen;
