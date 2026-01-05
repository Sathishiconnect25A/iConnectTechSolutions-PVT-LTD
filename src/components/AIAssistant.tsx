import { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'assistant';
}

const QUESTIONS = [
    { key: 'name', question: "Excellent! Let's get started 🚀 To begin your future-ready developer journey, what is your **Full Name**?", confirmation: "Nice to meet you, " },
    { key: 'email', question: "Got it! Upgrading your skills starts with communication. What is your **Email Address**?", confirmation: "Perfect, I've noted " },
    { key: 'mobile', question: "Communication is key to success! What is your **Mobile Number**?", confirmation: "Thank you! Secured as " },
    { key: 'status', question: "Are you currently a **Student, Fresher, or a Working Professional**?", confirmation: "Great perspective! Being a " },
    { key: 'qualification', question: "Education is the foundation. What is your **Highest Qualification**?", confirmation: "Impressive background! " },
    { key: 'year', question: "Time to scale! What was your **Year of Passing**? (Or expected year)", confirmation: "Understood. The class of " },
    { key: 'background', question: "Every path is unique. Is your background **IT or Non-IT**?", confirmation: "That's a strong starting point! " },
    { key: 'skillLevel', question: "Honesty is the first step to mastery. What is your current **Skill Level in Programming**? (Beginner / Intermediate / Advanced)", confirmation: "Acknowledged! Let's take those " },
    { key: 'goal', question: "Where do you see yourself? Is your goal a **Job, Skill Upgrade, or Career Switch**?", confirmation: "A noble objective! A " },
    { key: 'interest', question: "Finalizing your profile... Are you interested in **Backend, Frontend, or Full Stack development**?", confirmation: "The complete package! " },
    { key: 'projects', question: "Are you looking for an internship with **real-time projects** and **placement-oriented training**?", confirmation: "That's exactly what we specialize in! " }
];

export default function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [, setUserData] = useState<Record<string, string>>({});
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Welcome to ICONNECT TECH SOLUTIONS 🚀 I’m your AI career assistant, here to guide you into the world of DOTNET Full Stack Development. Let’s unlock your future — starting with a few quick questions.", sender: 'assistant' }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && messages.length === 1) {
            askNextQuestion(0);
        }
    }, [isOpen]);

    const askNextQuestion = (currentStep: number, prevAnswerConfirm: string = "") => {
        if (currentStep < QUESTIONS.length) {
            setIsTyping(true);
            setTimeout(() => {
                const combinedText = prevAnswerConfirm ? `${prevAnswerConfirm} \n\n ${QUESTIONS[currentStep].question}` : QUESTIONS[currentStep].question;
                const aiMsg: Message = { id: Date.now(), text: combinedText, sender: 'assistant' };
                setMessages(prev => [...prev, aiMsg]);
                setIsTyping(false);
            }, 800);
        } else {
            // Recommendation logic
            setIsTyping(true);
            setTimeout(() => {
                const recommendation = "You’re stepping into a future-ready tech journey 🚀 Based on our conversation, our **DOTNET Full Stack Internship** is the ideal catalyst for your growth. You'll gain industry-relevant skills, work on real-world projects, and receive professional mentorship designed to elevate your career beyond gravity. \n\n Would you like me to guide you through the enrollment process or syllabus next?";
                setMessages(prev => [...prev, { id: Date.now(), text: recommendation, sender: 'assistant' }]);
                setIsTyping(false);

                // Final scroll to internships
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
            }, 1000);
        }
    };

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now(), text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);

        if (step < QUESTIONS.length) {
            const currentQuestion = QUESTIONS[step];
            setUserData(prev => ({ ...prev, [currentQuestion.key]: text }));
            const confirmMsg = `${currentQuestion.confirmation} "${text}" is noted.`;
            const nextStep = step + 1;
            setStep(nextStep);

            // Pass nextStep explicitly
            setTimeout(() => askNextQuestion(nextStep, confirmMsg), 500);
        } else {
            setIsTyping(true);
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now(), text: "I'll notify our team about your interest! You're on the right path. 🚀", sender: 'assistant' }]);
                setIsTyping(false);
            }, 1000);
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
                            <span>ICONNECT Career Guide</span>
                        </div>
                        <button className="ai-close" onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
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

                    <form className="ai-chat-input" onSubmit={(e) => { e.preventDefault(); handleSend(input); setInput(""); }}>
                        <input
                            type="text"
                            placeholder="Type your answer..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" disabled={!input.trim()}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
