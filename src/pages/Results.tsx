
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import { Check, X, RotateCcw, Home } from "lucide-react";

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { quiz, quizResult, restartQuiz } = useQuiz();
  
  useEffect(() => {
    // Redirect if no result is available
    if (!quizResult) {
      navigate("/");
    }
  }, [quizResult, navigate]);
  
  if (!quizResult || !quiz) {
    return null;
  }
  
  const scorePercentage = Math.round(quizResult.score);
  
  const getScoreMessage = () => {
    if (scorePercentage >= 90) return "Excellent!";
    if (scorePercentage >= 70) return "Great job!";
    if (scorePercentage >= 50) return "Good effort!";
    return "Keep practicing!";
  };
  
  const handleRetry = () => {
    restartQuiz();
    navigate("/quiz");
  };
  
  const handleHome = () => {
    navigate("/");
  };
  
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Results</h1>
      
      <div className="quiz-card text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {getScoreMessage()}
        </h2>
        
        <div className="text-5xl font-bold mb-4 text-quiz-primary">
          {scorePercentage}%
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          You scored {quizResult.correctAnswers} out of {quizResult.totalQuestions} questions correctly.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="quiz-button-primary" onClick={handleRetry}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          
          <Button className="quiz-button-secondary" onClick={handleHome}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>
      </div>
      
      <div className="quiz-card">
        <h3 className="text-xl font-semibold mb-4">Question Breakdown</h3>
        
        {quizResult.answers.map((answer, index) => (
          <div 
            key={index}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 py-4"
          >
            <div className="flex items-start gap-2">
              <div className="mt-1">
                {answer.isCorrect ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div>
                <p className="font-medium mb-2">
                  Question {index + 1}: {answer.question}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Your answer: <span className={answer.isCorrect ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {answer.userAnswer}
                  </span>
                </p>
                {!answer.isCorrect && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Correct answer: <span className="text-green-500 font-medium">{answer.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
