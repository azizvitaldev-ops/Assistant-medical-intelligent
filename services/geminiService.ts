
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const createMedicalChat = (): Chat => {
  const ai = getAIClient();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
    },
  });
};

export const sendMessage = async (chat: Chat, message: string) => {
  try {
    const response = await chat.sendMessage({ message });
    return response;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export async function* sendMessageStream(chat: Chat, message: string) {
  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      yield (chunk as GenerateContentResponse).text;
    }
  } catch (error) {
    console.error("Gemini API Stream Error:", error);
    throw error;
  }
}
