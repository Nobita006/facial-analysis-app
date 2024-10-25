import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Create a reference for the message end
    const messagesEndRef = useRef(null);

    const handleSend = async () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);

        const newHistory = Array.isArray(history) ? [...history, { role: 'user', content: input }] : [{ role: 'user', content: input }];

        try {
                const response = await axios.post('https://sayan.work.gd/chatbot', {
                // const response = await axios.post('http://localhost:5000/chatbot', {
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

    // Function to toggle collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const upArrow = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
    
    const downArrow = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 12L12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
    

    return (
        <div className="chatbot-container">
            <div className={`chatbot-toggle ${isCollapsed ? 'collapsed' : ''}`} onClick={toggleCollapse}>
                {isCollapsed ? upArrow : downArrow}
            </div>
            {!isCollapsed && (
                <div className="chatbot">
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.sender === 'bot' ? (
                                    <ReactMarkdown>{msg.text}</ReactMarkdown>  // Markdown rendering for bot messages
                                ) : (
                                    msg.text
                                )}
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
            )}
        </div>
    );
};

export default Chatbot;
