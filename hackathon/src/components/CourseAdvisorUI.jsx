import React, { useState, useEffect, useRef } from "react";
import useCourseAdvisor from "../hooks/useCourseAdvisor";

function CourseAdvisorUI() {
  const {
    suggestCourse,
    askAboutCourse,
    recommendation,
    chatHistory,
    loadingCourse,
    loadingChat,
    error,
  } = useCourseAdvisor();

  const [hobbies, setHobbies] = useState("");
  const [favoriteSubject, setFavoriteSubject] = useState("");
  const [workSetting, setWorkSetting] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await suggestCourse(hobbies, favoriteSubject, workSetting);
    setFollowUpQuestion("");
  };

  const handleFollowUp = async (e) => {
    e.preventDefault();
    if (!followUpQuestion.trim()) return;
    await askAboutCourse(followUpQuestion);
    setFollowUpQuestion("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, recommendation]);

  return (
    <div className="d-flex justify-content-center align-items-start mt-5 mb-5">
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "550px" }}>
        <h3 className="text-center mb-3">🎓 College Course Finder</h3>
        <p className="text-center text-muted mb-4">
          Enter your hobbies, favorite subject, and preferred work setting — the AI will suggest the best college course for you and chat about it.
        </p>

        {/* Initial Course Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Hobbies:</label>
            <input
              type="text"
              className="form-control"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
              placeholder="e.g., coding, drawing, helping others"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Favorite Subject:</label>
            <input
              type="text"
              className="form-control"
              value={favoriteSubject}
              onChange={(e) => setFavoriteSubject(e.target.value)}
              placeholder="e.g., Math, Science, English"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Preferred Work Setting:</label>
            <input
              type="text"
              className="form-control"
              value={workSetting}
              onChange={(e) => setWorkSetting(e.target.value)}
              placeholder="e.g., office, outdoors, hospital, creative studio"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-4" disabled={loadingCourse}>
            {loadingCourse ? "Analyzing..." : "Find My Course"}
          </button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {recommendation && (
          <div className="mt-4">
            {/* Recommended Course */}
            <div className="alert alert-success p-3">
              <h5 className="fw-bold">Recommended Course:</h5>
              <strong>{recommendation.recommended_course}</strong>
              <p className="mt-2">{recommendation.reason}</p>
            </div>

            {/* Chat Title */}
            <h6 className="fw-bold mb-2">Learn more about the course:</h6>

            {/* Chat History */}
            <div className="chat-container d-flex flex-column" style={{ maxHeight: "400px", overflowY: "auto" }}>
              {chatHistory.map((chat, index) => (
                <div key={index} className="mb-3">
                  {/* User Question */}
                  <div className="d-flex justify-content-end mb-1">
                    <div
                      className="p-2 rounded"
                      style={{
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        maxWidth: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      {chat.question}
                    </div>
                  </div>
                  {/* AI Answer */}
                  <div className="d-flex justify-content-start">
                    <div
                      className="p-2 rounded"
                      style={{
                        backgroundColor: "#e9ecef",
                        color: "#000",
                        maxWidth: "80%",
                        wordWrap: "break-word",
                      }}
                    >
                      {chat.answer}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* Input at bottom of chat */}
            <form onSubmit={handleFollowUp} className="mt-3">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                  placeholder="Ask more about this course..."
                  disabled={loadingChat}
                  required
                />
                <button className="btn btn-secondary" type="submit" disabled={loadingChat}>
                  {loadingChat ? "Thinking..." : "Ask"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseAdvisorUI;
