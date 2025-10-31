import { useState, useEffect } from "react";
import "./MediaItem.css";

interface MediaItemProps {
  file: File;
  onRemove: () => void;
}

export const MediaItem = ({ file, onRemove }: MediaItemProps) => {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    if (file.type.startsWith("video/")) {
      setMediaType("video");
    } else {
      setMediaType("image");
    }

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  return (
    <div className="media-item">
      <button
        className="media-remove-button"
        onClick={handleRemove}
        aria-label="Remove media"
        title="Remove this media"
      >
        ×
      </button>

      {mediaType === "image" ? (
        <img
          src={mediaUrl}
          alt={file.name}
          className="media-content"
          draggable={false}
        />
      ) : (
        <video
          src={mediaUrl}
          className="media-content"
          controls
          loop
          draggable={false}
        />
      )}
    </div>
  );
};
