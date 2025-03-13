
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct answer in options array
}

export interface Quiz {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  source?: "mock" | "gemini"; // Track if questions are from mock data or Gemini AI
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  answers: {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
  }[];
}

// For Gemini API responses
export interface GeminiResponse {
  questions: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
}
