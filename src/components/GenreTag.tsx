
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
      className={cn("genre-tag", isSelected && "genre-tag-selected")}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default GenreTag;
