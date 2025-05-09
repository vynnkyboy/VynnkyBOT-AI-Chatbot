import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

const chatSession = model.startChat({
    generationConfig,
    history: [],
});

async function AskAi(Prompt) {
    const result = await chatSession.sendMessage(Prompt);
    return result.response.text();  // This returns a Promise
}

export default AskAi;
