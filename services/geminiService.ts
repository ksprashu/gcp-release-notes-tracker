import { GoogleGenAI } from "@google/genai";
import type { Product } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatProductDataForPrompt(products: Product[]): string {
    return products.map(p => {
        const changes = p.changes.map(c => 
            `- (${c.date.split('T')[0]}, ${c.type}): ${c.description}`
        ).join('\n');
        return `Product: ${p.name}\n${changes}`;
    }).join('\n\n');
}


export const getAiAssistedAnswer = async (query: string, products: Product[]): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set. Returning a mock response.");
    return new Promise(resolve => setTimeout(() => resolve(`This is a mock AI response for your query: "${query}". To get real answers, please ensure your API key is configured correctly. For example, I could tell you about the latest security updates or new features in Preview.`), 1000));
  }
  
  const productDataContext = formatProductDataForPrompt(products);

  const prompt = `
    You are an expert Google Cloud release notes assistant. Your task is to answer the user's question based *only* on the provided release note data.
    Do not use any external knowledge.
    Format your answer clearly using Markdown (e.g., lists, bold text) to make it easy to read.
    If the data does not contain an answer to the question, politely state that you couldn't find the information in the recent release notes.

    Here is the release note data:
    ---
    ${productDataContext}
    ---

    User's question: "${query}"
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not get an answer from the Gemini API.");
  }
};