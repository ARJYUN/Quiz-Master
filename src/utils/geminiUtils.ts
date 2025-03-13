
import { GeminiResponse, Quiz, QuizQuestion } from "@/types/quiz";

// Generate a prompt for Gemini to create a quiz on a specific topic
export const generateGeminiPrompt = (topic: string): string => {
  return `Generate a quiz with 5 multiple-choice questions about ${topic}. Format your response as a JSON object with this exact structure:
  {
    "questions": [
      {
        "question": "The full question text goes here?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswerIndex": 0 (The index of the correct answer, 0-based)
      }
    ]
  }
  
  Make sure the questions are interesting, accurate, and educational. Each question should have exactly 4 options with only one correct answer. The correctAnswerIndex should be between 0 and 3.
  IMPORTANT: Return ONLY valid JSON without any additional text, explanations, or formatting.`;
};

// Call the Gemini API to generate a quiz
export const callGeminiAPI = async (
  topic: string,
  apiKey: string
): Promise<Quiz | null> => {
  try {
    const prompt = generateGeminiPrompt(topic);
    
    // Updated API endpoint to use the correct version and model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 4096,
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the JSON string from the response
    const jsonText = data.candidates[0].content.parts[0].text;
    
    // Clean up any non-JSON content that might be in the response
    const cleanedJsonText = jsonText.replace(/```json|```/g, '').trim();
    
    // Parse the JSON string into an object
    const parsedData: GeminiResponse = JSON.parse(cleanedJsonText);
    
    // Convert Gemini response format to our Quiz format
    const quizQuestions: QuizQuestion[] = parsedData.questions.map((q, index) => ({
      id: index + 1,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswerIndex,
    }));

    return {
      id: `gemini-quiz-${Date.now()}`,
      topic,
      questions: quizQuestions,
      source: "gemini",
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return null;
  }
};
