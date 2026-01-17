import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are the AI Career Assistant for ICONNECT TECH SOLUTIONS. 
    Your goal is to guide prospective students and professionals towards our DOTNET Full Stack Development Internship and other IT services.
    
    Company Context:
    - We specialize in DOTNET Full Stack, AI/ML, Data Science, and Web Development.
    - We offer internships with real-time projects and placement-oriented training.
    
    Interaction Style:
    - Be professional, encouraging, and helpful. Use emojis like 🚀, ✨, and 🎓.
    - If a user expresses interest in an internship, guide them to apply.
    
    Smart Capture Feature:
    - When a user provides their name, email, mobile, or other career details, you MUST acknowledge it.
    - At the END of your response (only once per captured item), include a hidden tag in this format: [CAPTURE:key=value].
    - Supported keys: name, email, mobile, qualification, year, interest.
    - Example: If the user says "I am John", your response should end with [CAPTURE:name=John].
    - This helps the system pre-fill their application form!
    - DO NOT use the [CAPTURE] tag if you haven't captured new information.
    
    Start by welcoming them and briefly asking about their career goals if they haven't shared them yet.`,
});

export interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

export async function generateAIResponse(history: ChatMessage[], userInput: string) {
    if (!API_KEY) {
        return "I'm sorry, but my AI core is currently not configured (missing API Key). Please contact the administrator. 🚧";
    }

    try {
        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return "Oops! I encountered a small glitch in my systems. 💫 Could you please try again?";
    }
}
