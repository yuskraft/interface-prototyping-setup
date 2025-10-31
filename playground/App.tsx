import { useState, useEffect } from "react";
import { Feedback } from "@/components/Feedback";
import { Draggable } from "./Draggable";
import "./App.css";

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleFeedbackSubmit = (feedback: {
    type: "positive" | "negative";
    comment?: string;
  }) => {
    console.log("Feedback submitted:", feedback);
    alert(
      `Thank you for your ${feedback.type} feedback!${
        feedback.comment ? `\nComment: ${feedback.comment}` : ""
      }`
    );
  };

  return (
    <div className="playground">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="playground-content">
        <Draggable initialX={0} initialY={0}>
          <Feedback onSubmit={handleFeedbackSubmit} />
        </Draggable>
      </div>
    </div>
  );
}

export default App;
