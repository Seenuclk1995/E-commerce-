
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getShoppingAdvice = async (cartTotal: number, itemsCount: number) => {
  if (!API_KEY) return "Welcome to SR Premium Store! How can I help you today?";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User has ${itemsCount} items in their cart totaling $${cartTotal}. Suggest a friendly, luxury-branded shopping tip or a complementary product category (Clothes, Watches, Shoes) to look at. Keep it short and elegant, fitting the SR brand.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Experience the gold standard of shopping at SR.";
  }
};
