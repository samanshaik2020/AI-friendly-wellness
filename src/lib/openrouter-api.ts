// OpenRouter API service for Llama 4 Scout model
// Documentation: https://openrouter.ai/meta-llama/llama-4-scout:free/api

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

interface ChatCompletionResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  model: string;
  created: number;
}

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const LLAMA_4_SCOUT_MODEL = 'meta-llama/llama-4-scout:free';

// System prompt for healthcare assistant
const BAYMAX_SYSTEM_PROMPT = 
  "You are Baymax, a friendly healthcare companion AI. " +
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
 * Sends a chat completion request to the OpenRouter API
 */
export async function sendChatMessage(userMessage: string, chatHistory: ChatMessage[] = []): Promise<string> {
  try {
    // Prepare the messages array with system prompt and chat history
    const messages: ChatMessage[] = [
      { role: 'system', content: BAYMAX_SYSTEM_PROMPT },
      ...chatHistory,
      { role: 'user', content: userMessage }
    ];

    const requestBody: ChatCompletionRequest = {
      model: LLAMA_4_SCOUT_MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 1024
    };

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': 'Baymax Wellness AI' // Optional but recommended
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ChatCompletionResponse = await response.json();
    return data.choices[0].message.content;
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
  sender: 'user' | 'baymax';
  timestamp: Date;
}>): ChatMessage[] {
  return messages
    .filter(msg => msg.id > 1) // Skip the initial greeting message if needed
    .map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));
}
