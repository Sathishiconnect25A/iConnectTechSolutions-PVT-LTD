import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots, FaMicrophone, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { generateAIResponse } from '../services/GeminiService';
import type { ChatMessage } from '../services/GeminiService';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

interface AIAssistantProps {
    onCapture?: (data: Record<string, string>) => void;
}

export default function AIAssistant({ onCapture }: AIAssistantProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('chat_messages');
        return saved ? JSON.parse(saved) : [
            { id: 1, text: "Welcome to ICONNECT TECH SOLUTIONS 🚀 I’m your AI career assistant, here to guide you into the world of DOTNET Full Stack Development. How can I help you today?", sender: 'assistant' }
        ];
    });
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
        const saved = localStorage.getItem('chat_history');
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Persist messages and history
    useEffect(() => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
        localStorage.setItem('chat_history', JSON.stringify(chatHistory));
    }, [messages, chatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Speech Synthesis
    const speak = (text: string) => {
        if (isMuted) return;
        const utterance = new SpeechSynthesisUtterance(text.replace(/\*\*(.*?)\*\*/g, '$1'));
        window.speechSynthesis.speak(utterance);
    };

    // Speech Recognition
    const startListening = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            setIsListening(false);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const aiResponseText = await generateAIResponse(chatHistory, text);

            // Smart Capture logic
            // The AI is instructed via system prompt to hide JSON tags for capture if needed, 
            // but for simplicity here we just check for patterns or could add a hidden part.
            // Let's assume the AI might say something like [CAPTURE:name=John]
            const captureMatch = aiResponseText.match(/\[CAPTURE:(.*?)\]/);
            let cleanedResponse = aiResponseText;
            if (captureMatch) {
                const pairs = captureMatch[1].split(',');
                const captureData: Record<string, string> = {};
                pairs.forEach(p => {
                    const [k, v] = p.split('=');
                    if (k && v) captureData[k.trim()] = v.trim();
                });
                onCapture?.(captureData);
                cleanedResponse = aiResponseText.replace(/\[CAPTURE:.*?\]/g, '');
            }

            const aiMsg: Message = { id: Date.now() + 1, text: cleanedResponse, sender: 'assistant' };
            setMessages(prev => [...prev, aiMsg]);
            speak(cleanedResponse);

            setChatHistory(prev => [
                ...prev,
                { role: "user", parts: [{ text: text }] },
                { role: "model", parts: [{ text: aiResponseText }] }
            ]);

            if (cleanedResponse.toLowerCase().includes("internship")) {
                setTimeout(() => {
                    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to my brain right now. 💫", sender: 'assistant' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`ai-assistant-wrapper ${isOpen ? 'active' : ''}`}>
            {!isOpen && (
                <button className="ai-fab" onClick={() => setIsOpen(true)}>
                    <FaRobot />
                    <span className="fab-pulse"></span>
                </button>
            )}

            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <div className="ai-header-info">
                            <FaRobot className="ai-icon" />
                            <span>ICONNECT AI Assistant</span>
                        </div>
                        <div className="ai-header-actions">
                            <button onClick={() => setIsMuted(!isMuted)} title={isMuted ? "Unmute" : "Mute"}>
                                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                            </button>
                            <button className="ai-close" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`ai-message ${msg.sender}`}>
                                <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}></div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="ai-message assistant typing">
                                <div className="message-bubble">
                                    <FaCommentDots className="typing-icon" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="ai-chat-input" onSubmit={(e) => { e.preventDefault(); handleSend(input); }}>
                        <button type="button" className={`voice-btn ${isListening ? 'listening' : ''}`} onClick={startListening}>
                            <FaMicrophone />
                        </button>
                        <input
                            type="text"
                            placeholder="Type or speak..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim() || isTyping}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
