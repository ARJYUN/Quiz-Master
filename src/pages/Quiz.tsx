
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/context/QuizContext";
import QuizOption from "@/components/QuizOption";
import ProgressBar from "@/components/ProgressBar";
import { ArrowRight, Loader2 } from "lucide-react";

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const {
    quiz,
    currentQuestionIndex,
    userAnswers,
    answerQuestion,
    nextQuestion,
    completeQuiz,
  } = useQuiz();
  
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Redirect if quiz is not available
  useEffect(() => {
    if (!quiz) {
      navigate("/genre");
    }
  }, [quiz, navigate]);
  
  if (!quiz) {
    return (
      <div className="quiz-container items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-quiz-primary" />
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  
  const handleOptionSelect = (index: number) => {
    if (!showFeedback) {
      answerQuestion(currentQuestionIndex, index);
    }
  };
  
  const handleNextQuestion = () => {
    if (showFeedback) {
      setShowFeedback(false);
      if (isLastQuestion) {
        completeQuiz();
        navigate("/results");
      } else {
        nextQuestion();
      }
    } else {
      if (selectedAnswer !== undefined) {
        setShowFeedback(true);
      }
    }
  };
  
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz: {quiz.topic}</h1>
      
      <div className="mb-4 font-medium text-gray-600 dark:text-gray-300 text-center">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </div>
      
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={quiz.questions.length} 
      />
      
      <div className="quiz-card">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="mb-6">
          {currentQuestion.options.map((option, index) => (
            <QuizOption
              key={index}
              text={option}
              index={index}
              isSelected={selectedAnswer === index}
              isCorrect={showFeedback && index === currentQuestion.correctAnswer ? true : null}
              isIncorrect={showFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer ? true : null}
              onSelect={handleOptionSelect}
              disabled={showFeedback}
            />
          ))}
        </div>
        
        <Button
          className="quiz-button-primary w-full"
          onClick={handleNextQuestion}
          disabled={selectedAnswer === undefined}
        >
          {showFeedback ? (
            isLastQuestion ? "See Results" : "Next Question"
          ) : (
            "Check Answer"
          )}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
