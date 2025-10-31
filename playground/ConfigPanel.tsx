import { useRef } from "react";
import "./ConfigPanel.css";

interface ConfigPanelProps {
  theme: "light" | "dark";
  onThemeToggle: () => void;
  onMediaUpload: (files: File[]) => void;
}

export const ConfigPanel = ({
  theme,
  onThemeToggle,
  onMediaUpload,
}: ConfigPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onMediaUpload(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="config-panel">
      <button
        className="config-button theme-button"
        onClick={onThemeToggle}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <span className="config-label">
          {theme === "light" ? "Dark" : "Light"}
        </span>
      </button>

      <button
        className="config-button upload-button"
        onClick={handleUploadClick}
        aria-label="Upload media"
        title="Upload images, videos or GIFs"
      >
        <span className="config-icon">📁</span>
        <span className="config-label">Upload</span>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*,.gif"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};
