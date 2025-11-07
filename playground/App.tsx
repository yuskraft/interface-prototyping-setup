import { useState, useEffect } from "react";
import { Draggable } from "./Draggable";
import { ConfigPanel } from "./ConfigPanel";
import { MediaItem } from "./MediaItem";
import "./App.css";
import { ExamplePrototype1, ExamplePrototype2 } from "@/workspaces/workspace_1";

type Theme = "light" | "dark";

interface MediaFile {
  id: string;
  file: File;
  x: number;
  y: number;
  width?: number;
  height?: number;
}

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [gridSize, setGridSize] = useState(24);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--grid-size", `${gridSize}px`);
  }, [gridSize]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleMediaUpload = (files: File[]) => {
    const newMediaFiles = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      file,
      x: 100 + index * 50,
      y: 100 + index * 50,
    }));

    setMediaFiles((prev) => [...prev, ...newMediaFiles]);
  };

  const handleMediaRemove = (id: string) => {
    setMediaFiles((prev) => prev.filter((media) => media.id !== id));
  };

  const handleMediaResize = (id: string, width: number, height: number) => {
    setMediaFiles((prev) =>
      prev.map((media) =>
        media.id === id ? { ...media, width, height } : media
      )
    );
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
      <ConfigPanel
        theme={theme}
        gridSize={gridSize}
        onThemeToggle={toggleTheme}
        onMediaUpload={handleMediaUpload}
        onGridSizeChange={setGridSize}
      />

      <div className="playground-content">
        <Draggable initialX={0} initialY={0}>
          <ExamplePrototype1 />
        </Draggable>

        <Draggable initialX={0} initialY={0}>
          <ExamplePrototype2 />
        </Draggable>
        {mediaFiles.map((media) => (
          <Draggable key={media.id} initialX={media.x} initialY={media.y}>
            <MediaItem
              file={media.file}
              initialWidth={media.width}
              initialHeight={media.height}
              onRemove={() => handleMediaRemove(media.id)}
              onResize={(width, height) =>
                handleMediaResize(media.id, width, height)
              }
            />
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
