import { useState, useEffect, useRef } from "react";
import "./MediaItem.css";

interface MediaItemProps {
  file: File;
  initialWidth?: number;
  initialHeight?: number;
  onRemove: () => void;
  onResize?: (width: number, height: number) => void;
}

type ResizeHandle = "nw" | "ne" | "sw" | "se";

export const MediaItem = ({
  file,
  initialWidth = 400,
  initialHeight = 300,
  onRemove,
  onResize,
}: MediaItemProps) => {
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);

  const resizeDataRef = useRef<{
    handle: ResizeHandle;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const dimensionsRef = useRef({ width, height });

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    if (file.type.startsWith("video/")) {
      setMediaType("video");
    } else {
      setMediaType("image");
      const img = new Image();
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        setAspectRatio(ratio);
        setHeight(initialWidth / ratio);
      };
      img.src = url;
    }

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file, initialWidth]);

  useEffect(() => {
    dimensionsRef.current = { width, height };
  }, [width, height]);

  useEffect(() => {
    if (!isResizing) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDataRef.current) return;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (!resizeDataRef.current) return;

        const { handle, startX, startY, startWidth, startHeight } =
          resizeDataRef.current;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        switch (handle) {
          case "se":
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
          case "sw":
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
            break;
          case "ne":
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
            break;
          case "nw":
            newWidth = startWidth - deltaX;
            newHeight = startHeight - deltaY;
            break;
        }

        if (mediaType === "image" && aspectRatio) {
          newHeight = newWidth / aspectRatio;
        }

        const minSize = 100;
        if (newWidth >= minSize && newHeight >= minSize) {
          dimensionsRef.current = { width: newWidth, height: newHeight };
          setWidth(newWidth);
          setHeight(newHeight);
        }
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeDataRef.current = null;
      onResize?.(dimensionsRef.current.width, dimensionsRef.current.height);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, mediaType, aspectRatio, onResize]);

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove();
  };

  const handleResizeStart = (e: React.MouseEvent, handle: ResizeHandle) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    resizeDataRef.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: width,
      startHeight: height,
    };
  };

  return (
    <div
      className={`media-item ${isResizing ? "resizing" : ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
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

      <div
        className="resize-handle resize-handle-nw"
        onMouseDown={(e) => handleResizeStart(e, "nw")}
        title="Resize"
      />
      <div
        className="resize-handle resize-handle-ne"
        onMouseDown={(e) => handleResizeStart(e, "ne")}
        title="Resize"
      />
      <div
        className="resize-handle resize-handle-sw"
        onMouseDown={(e) => handleResizeStart(e, "sw")}
        title="Resize"
      />
      <div
        className="resize-handle resize-handle-se"
        onMouseDown={(e) => handleResizeStart(e, "se")}
        title="Resize"
      />
    </div>
  );
};
