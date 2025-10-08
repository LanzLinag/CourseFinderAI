import React from "react";
import Navbar from "../components/Navbar";
import CourseAdvisorUI from "../components/CourseAdvisorUI";
import "../css/courseAdvisorScreen.css";

function CourseAdvisorScreen() {
  return (
    <>
      <Navbar /> 
      <div className="advisor-screen-container">
        <div className="advisor-screen-content">
          <h2 className="advisor-screen-title">🎓 College Course Finder (Philippines)</h2>
          <CourseAdvisorUI />
        </div>
      </div>
    </>
  );
}

export default CourseAdvisorScreen;
