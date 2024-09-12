import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    
    // Create a reference for the message end
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);

        const newHistory = Array.isArray(history) ? [...history, { role: 'user', content: input }] : [{ role: 'user', content: input }];

        try {
            const response = await axios.post('http://localhost:5000/chatbot', {
                message: input,
                history: newHistory,
            });

            const botResponse = response.data.response;

            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);

            if (Array.isArray(response.data.history)) {
                setHistory(response.data.history);
            } else {
                setHistory([]);
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Use effect to scroll down whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="chatbot-container">
            <div className="chatbot">
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {/* Dummy div to scroll to */}
                    <div ref={messagesEndRef} />
                </div>
                <div className="input-group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        className="form-control"
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSend} className="btn btn-primary">Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
