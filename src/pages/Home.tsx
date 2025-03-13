
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-container items-center justify-center">
      <div className="max-w-lg w-full mx-auto text-center quiz-card">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-quiz-light dark:bg-quiz-primary/20 flex items-center justify-center animate-pulse-light">
            <Brain size={40} className="text-quiz-primary" />
          </div>
        </div>
        
        <h1 className="quiz-title">Welcome to the AI Quiz App</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Challenge yourself with personalized quizzes on any topic, powered by AI.
        </p>
        
        <Button 
          className="quiz-button-primary w-full md:w-auto"
          onClick={() => navigate("/genre")}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default Home;
