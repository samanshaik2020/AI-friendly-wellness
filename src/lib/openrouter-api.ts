// Gemini API service for Gemini 2.0 Flash model
// Documentation: https://ai.google.dev/docs/gemini_api
// This file now uses Gemini API instead of OpenRouter

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GeminiChatPart {
  text: string;
}

interface GeminiChatContent {
  role?: string;
  parts: GeminiChatPart[];
}

interface GeminiChatRequest {
  contents: GeminiChatContent[];
}

interface GeminiChatResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;

// System prompt for healthcare assistant
const DR_HELIO_SYSTEM_PROMPT =
  "You are Dr. Helio, a sunshine healthcare companion AI. " +
  "You provide helpful health information, wellness tips, and emotional support. " +
  "Always be compassionate, informative, and prioritize user well-being. " +
  "Remember to clarify that you're not a replacement for professional medical advice. " +
  "Format your responses exactly like this example: \n\n" +
  "I'm here to help. [Problem], especially [specific symptom], can be quite uncomfortable.\n\n" +
  "<strong>Causes of [Problem]:</strong>\n\n" +
  "1. [Cause one with brief explanation]\n\n" +
  "2. [Cause two with brief explanation]\n\n" +
  "3. [Cause three with brief explanation]\n\n" +
  "<strong>Recommended Medications:(Before use Please Consult the Doctor)</strong>\n\n" +
  "1. <strong>[Medicine name]</strong>: How it works and typical usage\n\n" +
  "2. <strong>[Medicine name]</strong>: How it works and typical usage\n\n" +
  "<strong>Home Remedies:</strong>\n\n" +
  "1. <strong>[Remedy name]</strong>: Detailed explanation of how to prepare and use\n\n" +
  "2. <strong>[Remedy name]</strong>: Detailed explanation of how to prepare and use\n\n" +
  "<strong>Recommended Diet:</strong>\n\n" +
  "1. <strong>Foods to Include:</strong>\n\n" +
  "   * [Food item] - Benefits for this condition\n\n" +
  "   * [Food item] - Benefits for this condition\n\n" +
  "2. <strong>Foods to Avoid:</strong>\n\n" +
  "   * [Food item] - Why it should be avoided\n\n" +
  "   * [Food item] - Why it should be avoided\n\n" +
  "<strong>Important Reminder:</strong>\n\n" +
  "It's essential to consult with a healthcare professional for a proper diagnosis and treatment plan. The information provided is for educational purposes only.\n\n" +
  "[Closing question to engage the user]";


/**
 * Converts standard chat messages to Gemini API format
 */
function convertToGeminiFormat(messages: ChatMessage[]): GeminiChatContent[] {
  const geminiContents: GeminiChatContent[] = [];

  // Handle system message separately
  const systemMessage = messages.find(msg => msg.role === 'system');

  // Process user and assistant messages
  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    if (message.role === 'system') continue; // Skip system messages in this loop

    // For Gemini API, we need to format as user/model roles
    const role = message.role === 'user' ? 'user' : 'model';

    geminiContents.push({
      role: role,
      parts: [{ text: message.content }]
    });
  }

  // If there's a system message, prepend it to the first user message
  if (systemMessage && geminiContents.length > 0) {
    // Find the first user message
    const firstUserIndex = geminiContents.findIndex(content => content.role === 'user');
    if (firstUserIndex >= 0) {
      // Prepend system prompt to the first user message
      const firstUserContent = geminiContents[firstUserIndex].parts[0].text;
      geminiContents[firstUserIndex].parts[0].text =
        `${systemMessage.content}\n\nUser message: ${firstUserContent}`;
    }
  }

  return geminiContents;
}

/**
 * Sends a chat completion request to the Gemini API
 */
export async function sendChatMessage(userMessage: string, chatHistory: ChatMessage[] = []): Promise<string> {
  try {
    // Prepare the messages array with system prompt and chat history
    const messages: ChatMessage[] = [
      { role: 'system', content: DR_HELIO_SYSTEM_PROMPT },
      ...chatHistory,
      { role: 'user', content: userMessage }
    ];

    // Convert to Gemini format
    const geminiContents = convertToGeminiFormat(messages);

    const requestBody: GeminiChatRequest = {
      contents: geminiContents
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiChatResponse = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
}

/**
 * Converts the application's message format to the API's chat message format
 */
export function formatChatHistory(messages: Array<{
  id: number;
  text: string;
  sender: 'user' | 'drhelio';
  timestamp: Date;
}>): ChatMessage[] {
  return messages
    .filter(msg => msg.id > 1) // Skip the initial greeting message if needed
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
}
