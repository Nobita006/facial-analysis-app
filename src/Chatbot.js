// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';  // Assuming you have a CSS file for styling

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]); // Ensure history is initialized as an empty array

    const handleSend = async () => {
        if (input.trim() === '') return;

        // Add user message to chat
        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);

        // Update the history state with user message
        const newHistory = Array.isArray(history) ? [...history, { role: 'user', content: input }] : [{ role: 'user', content: input }];

        try {
            // Send request to Flask backend with user message and history
            const response = await axios.post('http://localhost:5000/chatbot', {
                message: input,
                history: newHistory,  // Send the updated history
            });

            const botResponse = response.data.response;

            // Update chat with bot response
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
            
            // Update the history with bot response
            if (Array.isArray(response.data.history)) {
                setHistory(response.data.history);  // Ensure history is always set to an array
            } else {
                setHistory([]);  // Reset history if something went wrong
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }

        setInput('');
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot">
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
