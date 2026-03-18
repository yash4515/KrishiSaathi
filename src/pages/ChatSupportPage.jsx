import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import { useTranslation } from 'react-i18next';
import { Send, Bot, User, Mic, Leaf } from 'lucide-react';
import { sendMessageToOpenAI } from '../services/openaiService';

const quickActions = [
    '🌾 Crop prices today',
    '🌦️ Weather forecast',
    '🧪 Fertilizer advice',
    '🛡️ Insurance help',
];



export default function ChatSupportPage() {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'नमस्ते! 🙏 मैं KrishiSaathi सहायक हूँ। मैं आपकी खेती संबंधी सवालों में मदद कर सकता हूँ। How can I help you today?', time: '10:00 AM' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;
        const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const userMsg = { id: Date.now(), type: 'user', text, time: now };
        
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        const aiResponseText = await sendMessageToOpenAI([...messages, userMsg]);
        
        setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            type: 'bot', 
            text: aiResponseText, 
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setTyping(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16 h-screen flex flex-col max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{t('chat.title')}</h2>
                        <p className="text-xs text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full inline-block" /> {t('chat.online')}
                        </p>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                    {messages.map(msg => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex items-end gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'bot' ? 'bg-primary-100' : 'bg-blue-100'
                                    }`}>
                                    {msg.type === 'bot' ? <Bot className="w-4 h-4 text-primary-600" /> : <User className="w-4 h-4 text-blue-600" />}
                                </div>
                                <div>
                                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.type === 'bot'
                                            ? 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                                            : 'bg-primary-600 text-white rounded-br-md'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    <p className={`text-[10px] text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : ''}`}>{msg.time}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {typing && (
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-primary-600" />
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 rounded-bl-md">
                                <div className="flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 md:px-6 pb-2 flex gap-2 overflow-x-auto">
                    {quickActions.map(action => (
                        <button
                            key={action}
                            onClick={() => sendMessage(action)}
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-200 transition-all whitespace-nowrap flex-shrink-0"
                        >
                            {action}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 md:p-6 bg-white border-t border-gray-200">
                    <form onSubmit={e => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-3">
                        <input
                            type="text"
                            className="input-field flex-1"
                            placeholder={t('chat.placeholder')}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button type="button" className="p-3 rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <button type="submit" className="p-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-md">
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
