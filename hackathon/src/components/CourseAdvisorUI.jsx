import React, { useState, useEffect, useRef } from "react";
import useCourseAdvisor from "../hooks/useCourseAdvisor";
import "../css/courseAdvisorUI.css";

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
    <div className="advisor-screen">
      <div className={`advisor-card always-visible`}>

        <div className="advisor-layout active-layout">
          {/* Left side – Form & Recommendation */}
          <div className="advisor-left">
            <form onSubmit={handleSubmit} className="advisor-form">
              <div className="form-group">
                <label className="form-label">Hobbies:</label>
                <input
                  type="text"
                  className="form-input"
                  value={hobbies}
                  onChange={(e) => setHobbies(e.target.value)}
                  placeholder="e.g., coding, drawing, helping others"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Favorite Subject:</label>
                <input
                  type="text"
                  className="form-input"
                  value={favoriteSubject}
                  onChange={(e) => setFavoriteSubject(e.target.value)}
                  placeholder="e.g., Math, Science, English"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Work Setting:</label>
                <input
                  type="text"
                  className="form-input"
                  value={workSetting}
                  onChange={(e) => setWorkSetting(e.target.value)}
                  placeholder="e.g., office, outdoors, hospital, creative studio"
                  required
                />
              </div>

              <button type="submit" className="advisor-button" disabled={loadingCourse}>
                {loadingCourse ? "Analyzing..." : "Find My Course"}
              </button>
            </form>

            {error && <div className="advisor-error">{error}</div>}

            {recommendation && (
              <div className="advisor-recommendation">
                <div className="advisor-course">
                  <h5>Recommended Course:</h5>
                  <strong>{recommendation.recommended_course}</strong>
                  <p>{recommendation.reason}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right side – Chatbot (always visible) */}
          <div className="advisor-chat">
            <h6 className="chat-heading">Ask about courses:</h6>
            <div className="chat-container">
              {chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                  <div key={index} className="chat-message">
                    <div className="chat-user">{chat.question}</div>
                    <div className="chat-ai">{chat.answer}</div>
                  </div>
                ))
              ) : (
                <div className="chat-placeholder">
                  👋 Hi! I’m your Course Advisor AI.  
                  You can start by entering your hobbies, subjects, and work preferences — or ask me about any course!
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            <form onSubmit={handleFollowUp} className="chat-input-form">
              <input
                type="text"
                className="chat-input"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="Ask about any course..."
                disabled={loadingChat}
                required
              />
              <button className="chat-button" type="submit" disabled={loadingChat}>
                {loadingChat ? "Thinking..." : "Ask"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseAdvisorUI;
