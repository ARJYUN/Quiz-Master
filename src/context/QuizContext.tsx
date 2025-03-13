
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Quiz, QuizQuestion, QuizResult } from "@/types/quiz";
import { generateMockQuiz } from "@/utils/mockData";
import { callGeminiAPI } from "@/utils/geminiUtils";
import { useToast } from "@/hooks/use-toast";

interface QuizContextType {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  userAnswers: number[];
  quizResult: QuizResult | null;
  isLoading: boolean;
  apiKey: string;
  setApiKey: (key: string) => void;
  generateQuiz: (topic: string, useGemini?: boolean) => Promise<void>;
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
  const [apiKey, setApiKey] = useState<string>("");
  
  const { toast } = useToast();

  const generateQuiz = async (topic: string, useGemini: boolean = false) => {
    setIsLoading(true);
    try {
      if (useGemini && apiKey) {
        // Use Gemini to generate questions
        const newQuiz = await callGeminiAPI(topic, apiKey);
        
        if (newQuiz) {
          setQuiz(newQuiz);
          toast({
            title: "Quiz Generated with Gemini AI",
            description: `Your AI-powered quiz on ${newQuiz.topic} is ready!`,
            duration: 3000,
          });
        } else {
          throw new Error("Failed to generate quiz with Gemini AI");
        }
      } else {
        // Fallback to mock data
        setTimeout(() => {
          const newQuiz = generateMockQuiz(topic);
          setQuiz(newQuiz);
          toast({
            title: "Quiz Generated",
            description: `Your quiz on ${newQuiz.topic} is ready!`,
            duration: 3000,
          });
        }, 1000); // Simulate API call
      }
    } catch (error) {
      console.error("Error generating quiz:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate quiz. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
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
        apiKey,
        setApiKey,
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
