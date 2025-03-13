
import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect?: boolean | null;
  isIncorrect?: boolean | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  index,
  isSelected,
  isCorrect,
  isIncorrect,
  onSelect,
  disabled = false,
}) => {
  // Determine the option class based on its state
  const optionClass = cn(
    "quiz-option",
    isSelected && "quiz-option-selected",
    isCorrect && "quiz-option-correct",
    isIncorrect && "quiz-option-incorrect"
  );

  const handleClick = () => {
    if (!disabled) {
      onSelect(index);
    }
  };

  // Labels for the options
  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className={optionClass} onClick={handleClick}>
      <div className="flex-grow flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 font-medium text-gray-700 dark:text-gray-300">
          {optionLabels[index]}
        </div>
        <div className="flex-grow">{text}</div>
      </div>
      {isCorrect && (
        <div className="text-green-500">
          <Check className="h-5 w-5" />
        </div>
      )}
      {isIncorrect && (
        <div className="text-red-500">
          <X className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default QuizOption;
