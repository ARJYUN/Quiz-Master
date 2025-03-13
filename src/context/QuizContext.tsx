
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Quiz, QuizQuestion, QuizResult } from "@/types/quiz";
import { generateMockQuiz } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

interface QuizContextType {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: number[];
  quizResult: QuizResult | null;
  isLoading: boolean;
  generateQuiz: (topic: string) => Promise<void>;
  startQuiz: () => void;
  answerQuestion: (questionIndex: number, answerIndex: number) => void;
  nextQuestion: () => void;
  completeQuiz: () => void;
  restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const { toast } = useToast();

  const generateQuiz = async (topic: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would call the backend API
      // For now, we'll use mock data
      setTimeout(() => {
        const newQuiz = generateMockQuiz(topic);
        setQuiz(newQuiz);
        setIsLoading(false);
        toast({
          title: "Quiz Generated",
          description: `Your quiz on ${newQuiz.topic} is ready!`,
          duration: 3000,
        });
      }, 1000); // Simulate API call
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLoading(false);
    }
  };

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
  };

  const answerQuestion = (questionIndex: number, answerIndex: number) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[questionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  };

  const nextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const completeQuiz = () => {
    if (!quiz) return;
    
    const results = calculateResults(quiz, userAnswers);
    setQuizResult(results);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${results.correctAnswers} out of ${results.totalQuestions}`,
      duration: 5000,
    });
  };

  const calculateResults = (quiz: Quiz, answers: number[]): QuizResult => {
    let correctAnswers = 0;
    const detailedAnswers = quiz.questions.map((q, index) => {
      const userAnswer = answers[index] !== undefined ? answers[index] : -1;
      const isCorrect = userAnswer === q.correctAnswer;
      
      if (isCorrect) correctAnswers++;
      
      return {
        question: q.question,
        userAnswer: userAnswer !== -1 ? q.options[userAnswer] : "No answer",
        correctAnswer: q.options[q.correctAnswer],
        isCorrect,
      };
    });
    
    return {
      totalQuestions: quiz.questions.length,
      correctAnswers,
      incorrectAnswers: quiz.questions.length - correctAnswers,
      score: (correctAnswers / quiz.questions.length) * 100,
      answers: detailedAnswers,
    };
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizResult(null);
  };

  return (
    <QuizContext.Provider
      value={{
        quiz,
        currentQuestionIndex,
        userAnswers,
        quizResult,
        isLoading,
        generateQuiz,
        startQuiz,
        answerQuestion,
        nextQuestion,
        completeQuiz,
        restartQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
