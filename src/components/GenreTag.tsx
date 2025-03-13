
import React from "react";
import { cn } from "@/lib/utils";

interface GenreTagProps {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const GenreTag: React.FC<GenreTagProps> = ({ text, isSelected, onClick }) => {
  return (
    <div
      className={cn(
        "genre-tag px-3 py-1 rounded-full text-sm font-medium m-1 cursor-pointer transition-colors",
        isSelected 
          ? "bg-primary/80 text-primary-foreground" 
          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default GenreTag;
