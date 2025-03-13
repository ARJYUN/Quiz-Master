
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { suggestedGenres } from "@/utils/mockData";
import GenreTag from "@/components/GenreTag";
import { Loader2 } from "lucide-react";

const GenreSelection: React.FC = () => {
  const navigate = useNavigate();
  const { generateQuiz, isLoading } = useQuiz();
  const [inputTopic, setInputTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTopic(e.target.value);
    // If there's text, use it as the selected topic
    if (e.target.value.trim()) {
      setSelectedTopic(e.target.value);
    }
  };

  const handleTagClick = (genre: string) => {
    setSelectedTopic(genre);
    setInputTopic(genre);
  };

  const handleGenerateQuiz = async () => {
    if (!selectedTopic.trim()) return;
    
    await generateQuiz(selectedTopic);
    navigate("/quiz");
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Choose Your Quiz Topic</h1>
      
      <div className="quiz-card max-w-xl mx-auto w-full">
        <div className="mb-6">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter a topic or choose from suggestions
          </label>
          <Input
            id="topic"
            type="text"
            placeholder="E.g., History, Science, Technology..."
            value={inputTopic}
            onChange={handleTopicChange}
            className="w-full"
          />
        </div>
        
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Suggested Topics:
          </p>
          <div className="flex flex-wrap">
            {suggestedGenres.map((genre) => (
              <GenreTag
                key={genre}
                text={genre}
                isSelected={selectedTopic === genre}
                onClick={() => handleTagClick(genre)}
              />
            ))}
          </div>
        </div>
        
        <Button
          className="quiz-button-primary w-full"
          onClick={handleGenerateQuiz}
          disabled={!selectedTopic.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            "Generate Quiz"
          )}
        </Button>
      </div>
    </div>
  );
};

export default GenreSelection;
