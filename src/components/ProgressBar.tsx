
import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="quiz-progress">
      <div 
        className="quiz-progress-bar"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
