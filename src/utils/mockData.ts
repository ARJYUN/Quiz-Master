
import { Quiz } from "../types/quiz";

// This file provides mock data until we connect to the backend with Gemini AI
export const generateMockQuiz = (topic: string): Quiz => {
  // For simplicity, we're using predefined questions based on popular topics
  const topics: Record<string, Quiz> = {
    history: {
      id: "mock-history-quiz",
      topic: "History",
      questions: [
        {
          id: 1,
          question: "Who was the first President of the United States?",
          options: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "Which ancient civilization built the pyramids at Giza?",
          options: ["Romans", "Greeks", "Egyptians", "Persians"],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "Who wrote the 'I Have a Dream' speech?",
          options: ["Malcolm X", "Martin Luther King Jr.", "Barack Obama", "Nelson Mandela"],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Which event marked the beginning of World War I?",
          options: ["The assassination of Archduke Franz Ferdinand", "The invasion of Poland", "The bombing of Pearl Harbor", "The Russian Revolution"],
          correctAnswer: 0
        }
      ]
    },
    science: {
      id: "mock-science-quiz",
      topic: "Science",
      questions: [
        {
          id: 1,
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Jupiter", "Mars", "Saturn"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "What is the hardest natural substance on Earth?",
          options: ["Platinum", "Diamond", "Titanium", "Quartz"],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Which of these is NOT a type of blood cell?",
          options: ["Red blood cell", "White blood cell", "Platelet", "Neuron"],
          correctAnswer: 3
        },
        {
          id: 5,
          question: "What is the scientific name for the process by which plants make their own food?",
          options: ["Respiration", "Photosynthesis", "Fermentation", "Digestion"],
          correctAnswer: 1
        }
      ]
    },
    technology: {
      id: "mock-technology-quiz",
      topic: "Technology",
      questions: [
        {
          id: 1,
          question: "Who is the co-founder of Microsoft?",
          options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Central Processor Utility"],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "Which programming language is often used for artificial intelligence?",
          options: ["Java", "C++", "Python", "Ruby"],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What year was the first iPhone released?",
          options: ["2005", "2007", "2009", "2011"],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What does 'HTTP' stand for?",
          options: ["HyperText Transfer Protocol", "High Tech Transfer Protocol", "Hybrid Text Transfer Process", "Hyperlink Tracking Transfer Protocol"],
          correctAnswer: 0
        }
      ]
    },
    movies: {
      id: "mock-movies-quiz",
      topic: "Movies",
      questions: [
        {
          id: 1,
          question: "Which film won the Academy Award for Best Picture in 2020?",
          options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Who directed the movie 'Inception'?",
          options: ["Steven Spielberg", "James Cameron", "Christopher Nolan", "Quentin Tarantino"],
          correctAnswer: 2
        },
        {
          id: 3,
          question: "Which actor has NOT played Batman in a feature film?",
          options: ["George Clooney", "Christian Bale", "Tom Cruise", "Ben Affleck"],
          correctAnswer: 2
        },
        {
          id: 4,
          question: "What was the first fully computer-animated feature film?",
          options: ["Shrek", "Toy Story", "A Bug's Life", "Monsters, Inc."],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "Which movie franchise features a character named Indiana Jones?",
          options: ["Star Wars", "Indiana Jones", "Mission Impossible", "James Bond"],
          correctAnswer: 1
        }
      ]
    },
    geography: {
      id: "mock-geography-quiz",
      topic: "Geography",
      questions: [
        {
          id: 1,
          question: "What is the capital of Australia?",
          options: ["Sydney", "Melbourne", "Canberra", "Perth"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Which is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Southern Ocean", "Pacific Ocean"],
          correctAnswer: 3
        },
        {
          id: 3,
          question: "Which mountain is the tallest in the world?",
          options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
          correctAnswer: 1
        },
        {
          id: 4,
          question: "Which country has the largest population in the world?",
          options: ["India", "United States", "China", "Russia"],
          correctAnswer: 2
        },
        {
          id: 5,
          question: "What is the longest river in the world?",
          options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
          correctAnswer: 1
        }
      ]
    }
  };

  // Default to technology if the topic doesn't match our predefined ones
  const lowerTopic = topic.toLowerCase();
  const availableTopics = Object.keys(topics);
  
  // Find the closest match or default to technology
  const matchedTopic = availableTopics.find(t => lowerTopic.includes(t)) || "technology";
  
  return topics[matchedTopic];
};

export const suggestedGenres = [
  "History", "Science", "Technology", "Movies", "Geography", 
  "Music", "Sports", "Art", "Literature", "Food & Cooking"
];
