import React, { useState } from "react";
import "./Feedback.css";

export interface FeedbackProps {
  onSubmit?: (feedback: {
    type: "positive" | "negative";
    comment?: string;
  }) => void;
  onDismiss?: () => void;
  allowComment?: boolean;
  labels?: {
    positive?: string;
    negative?: string;
    submit?: string;
    cancel?: string;
    commentPlaceholder?: string;
  };
  className?: string;
}

export const Feedback: React.FC<FeedbackProps> = ({
  onSubmit,
  onDismiss,
  allowComment = true,
  labels = {},
  className = "",
}) => {
  const [selectedType, setSelectedType] = useState<
    "positive" | "negative" | null
  >(null);
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  const defaultLabels = {
    positive: "👍 Good",
    negative: "👎 Not Good",
    submit: "Submit",
    cancel: "Cancel",
    commentPlaceholder: "Tell us more... (optional)",
    ...labels,
  };

  const handleTypeSelect = (type: "positive" | "negative") => {
    setSelectedType(type);
    if (allowComment) {
      setShowComment(true);
    } else {
      onSubmit?.({ type });
    }
  };

  const handleSubmit = () => {
    if (selectedType) {
      onSubmit?.({
        type: selectedType,
        comment: comment.trim() || undefined,
      });
      setSelectedType(null);
      setComment("");
      setShowComment(false);
    }
  };

  const handleCancel = () => {
    setSelectedType(null);
    setComment("");
    setShowComment(false);
    onDismiss?.();
  };

  return (
    <div className={`feedback-widget ${className}`}>
      {!showComment ? (
        <div className="feedback-initial">
          <p className="feedback-question">How was your experience?</p>
          <div className="feedback-buttons">
            <button
              className="feedback-button feedback-button-positive"
              onClick={() => handleTypeSelect("positive")}
              aria-label="Positive feedback"
            >
              {defaultLabels.positive}
            </button>
            <button
              className="feedback-button feedback-button-negative"
              onClick={() => handleTypeSelect("negative")}
              aria-label="Negative feedback"
            >
              {defaultLabels.negative}
            </button>
          </div>
        </div>
      ) : (
        <div className="feedback-form">
          <div className="feedback-selected">
            <span className="feedback-selected-label">
              You selected:{" "}
              {selectedType === "positive"
                ? defaultLabels.positive
                : defaultLabels.negative}
            </span>
          </div>
          <textarea
            className="feedback-textarea"
            placeholder={defaultLabels.commentPlaceholder}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
          <div className="feedback-actions">
            <button
              className="feedback-action-button feedback-cancel"
              onClick={handleCancel}
            >
              {defaultLabels.cancel}
            </button>
            <button
              className="feedback-action-button feedback-submit"
              onClick={handleSubmit}
            >
              {defaultLabels.submit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
