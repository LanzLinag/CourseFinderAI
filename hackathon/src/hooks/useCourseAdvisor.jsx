import { useState } from "react";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import app from "../config/firebase";

export default function useCourseAdvisor() {
  const [recommendation, setRecommendation] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingCourse, setLoadingCourse] = useState(false); // for course suggestion
  const [loadingChat, setLoadingChat] = useState(false); // for follow-ups
  const [error, setError] = useState(null);

  const ai = getAI(app, { backend: new GoogleAIBackend() });
  const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

  // Suggest course based on hobbies, subject, and work setting
  const suggestCourse = async (hobbies, favoriteSubject, workSetting) => {
    setLoadingCourse(true);
    setError(null);
    setChatHistory([]);

    const prompt = `
You are an educational guidance AI specialized in helping students in the Philippines choose the right college course.

Input details:
- Hobbies: ${hobbies.trim()}
- Favorite Subjects: ${favoriteSubject.trim()}
- Preferred Work Setting: ${workSetting.trim()}

Your task:
1. Suggest one college course in the Philippines that best fits the student.
2. Provide a short and clear explanation (2–3 sentences) on why that course fits them.
3. Output JSON only:
{
  "recommended_course": "BS _____",
  "reason": "Explain why this course fits the student."
}
`;

    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const cleaned = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setRecommendation(parsed);
    } catch (err) {
      console.error("Error generating recommendation:", err);
      setError("Failed to generate course recommendation.");
    } finally {
      setLoadingCourse(false);
    }
  };

  // Ask follow-up questions in chatbot style
  const askAboutCourse = async (question) => {
    if (!recommendation) return;

    setLoadingChat(true);
    setError(null);

    const historyText = chatHistory
      .map((c, i) => `Q${i + 1}: ${c.question}\nA${i + 1}: ${c.answer}`)
      .join("\n");

    const prompt = `
You are an educational AI named Gemini with a curious and intriguing personality. 
The student was previously recommended the course: ${recommendation.recommended_course}.

Previous conversation:
${historyText}

Student asks: ${question}

Respond conversationally in 3–4 concise sentences, using easy-to-understand words. 
Build on previous discussion if applicable.
`;

    try {
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      const answer = text.trim();
      setChatHistory((prev) => [...prev, { question, answer }]);
    } catch (err) {
      console.error("Error generating follow-up answer:", err);
      setError("Failed to get follow-up answer.");
    } finally {
      setLoadingChat(false);
    }
  };

  return {
    suggestCourse,
    askAboutCourse,
    recommendation,
    chatHistory,
    loadingCourse,
    loadingChat,
    error,
  };
}
