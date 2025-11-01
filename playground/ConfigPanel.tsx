import { useRef, useState, useEffect } from "react";
import "./ConfigPanel.css";

interface ConfigPanelProps {
  theme: "light" | "dark";
  gridSize: number;
  onThemeToggle: () => void;
  onMediaUpload: (files: File[]) => void;
  onGridSizeChange: (size: number) => void;
}

export const ConfigPanel = ({
  theme,
  gridSize,
  onThemeToggle,
  onMediaUpload,
  onGridSizeChange,
}: ConfigPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const gridControlRef = useRef<HTMLDivElement>(null);
  const [showGridControl, setShowGridControl] = useState(false);

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

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGridSizeChange(Number(e.target.value));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showGridControl &&
        gridControlRef.current &&
        !gridControlRef.current.contains(event.target as Node)
      ) {
        setShowGridControl(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showGridControl]);

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

      <div className="config-control-group" ref={gridControlRef}>
        <button
          className="config-button grid-button"
          onClick={() => setShowGridControl(!showGridControl)}
          aria-label="Grid size control"
          title="Adjust grid size"
        >
          <span className="config-label">Grid Size</span>
        </button>

        {showGridControl && (
          <div className="grid-control-popup">
            <label className="grid-control-label">
              Grid Size: {gridSize}px
            </label>
            <input
              type="range"
              min="8"
              max="64"
              step="4"
              value={gridSize}
              onChange={handleGridSizeChange}
              className="grid-size-slider"
            />
          </div>
        )}
      </div>

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
