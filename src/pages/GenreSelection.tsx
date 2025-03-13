
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
  const { generateQuiz, isLoading, apiKey, setApiKey } = useQuiz();
  const [inputTopic, setInputTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [useGemini, setUseGemini] = useState(true);

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

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
  };

  const handleGenerateQuiz = async () => {
    if (!selectedTopic.trim()) return;
    
    await generateQuiz(selectedTopic, useGemini);
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
        
        <div className="mb-6">
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
        
        <div className="border rounded-lg p-4 mb-6 bg-gray-50 dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI-Powered Quizzes
          </h3>
          <div className="mb-3">
            <div className="flex items-center mb-2">
              <input 
                id="useGemini" 
                type="checkbox" 
                checked={useGemini} 
                onChange={() => setUseGemini(!useGemini)}
                className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
              />
              <label htmlFor="useGemini" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Use Gemini AI to generate questions
              </label>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Generate unique questions for any topic using Google's Gemini AI
            </p>
          </div>
          
          {useGemini && (
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gemini API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={handleApiKeyChange}
                className="w-full mb-2"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                For demonstration purposes. In production, API keys should be secured server-side.
              </p>
            </div>
          )}
        </div>
        
        <Button
          className="quiz-button-primary w-full"
          onClick={handleGenerateQuiz}
          disabled={!selectedTopic.trim() || isLoading || (useGemini && !apiKey)}
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
