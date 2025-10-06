import React from "react";
import CourseAdvisorUI from "../components/CourseAdvisorUI";

function CourseAdvisorScreen() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4 fw-bold">🎓 College Course Finder (Philippines)</h2>
        <p className="text-center text-muted mb-4">
          Enter your hobbies, favorite subject, and preferred work setting — the AI will suggest
          the best college course for you and explain why it fits.
        </p>
        <CourseAdvisorUI />
      </div>
    </div>
  );
}

export default CourseAdvisorScreen;
