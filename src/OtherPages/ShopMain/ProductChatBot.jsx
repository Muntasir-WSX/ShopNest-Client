import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ProductChatBot = ({ product }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: `Hi! I'm your ShopNest assistant. Ask me anything!` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const axiosSecure = useAxiosSecure();

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await axiosSecure.post('/chat/product-info', {
                userMessage: input,
                productDetails: product 
            });
            setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }]);
            
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting to the server." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chat Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-circle btn-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl border-none"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
                    <div className="bg-emerald-600 p-4 text-white font-bold flex justify-between items-center">
                        <span>ShopNest AI Support</span>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`chat ${msg.role === 'bot' ? 'chat-start' : 'chat-end'}`}>
                                <div className={`chat-bubble ${msg.role === 'bot' ? 'bg-white text-gray-800 shadow-sm' : 'bg-emerald-600 text-white'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="chat chat-start"><div className="chat-bubble bg-white text-gray-400">Typing...</div></div>}
                    </div>

                    <div className="p-4 bg-white border-t flex gap-2">
                        <input 
                            type="text" 
                            className="input input-bordered flex-1 rounded-full input-sm focus:outline-emerald-600" 
                            placeholder="Ask something..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend} className="btn btn-circle btn-sm bg-emerald-600 text-white border-none">
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductChatBot;