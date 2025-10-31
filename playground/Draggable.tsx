import { useState, useEffect, ReactNode } from "react";

interface Position {
  x: number;
  y: number;
}

interface DraggableProps {
  children: ReactNode;
  initialX?: number;
  initialY?: number;
}

export const Draggable = ({
  children,
  initialX = 0,
  initialY = 0,
}: DraggableProps) => {
  const [position, setPosition] = useState<Position>({
    x: initialX,
    y: initialY,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;

        setPosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();

    if (
      tagName !== "button" &&
      tagName !== "input" &&
      tagName !== "textarea" &&
      tagName !== "select" &&
      tagName !== "a" &&
      !target.closest("button") &&
      !target.closest("input") &&
      !target.closest("textarea") &&
      !target.closest("select") &&
      !target.closest("a") &&
      !target.classList.contains("resize-handle") &&
      !target.closest(".resize-handle")
    ) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  return (
    <div
      className={`draggable-wrapper ${isDragging ? "dragging" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};
