import React, { useState, useRef, useEffect } from 'react';
//useRef to reference a dom element and useEffect to perform side effects in function components
import './AIChat.css';
import axios from 'axios';

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello, How are you feeling today?", }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null); //to scroll the chat automatically when new message arrives
  const sendMessageToBot = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);
    setInput('');

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      const aiReply = res.data.choices[0].message.content;
      const newAIMessage = { role: 'assistant', content: aiReply };
      setMessages((prev) => [...prev, newAIMessage]);
    } catch (err) {
      console.error("❌ Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't respond right now." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessageToBot();
  };

  
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Talk to BloomBot</h2>
      
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="chat-bubble assistant">Typing...</div>}
        <div ref={bottomRef} /> 
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessageToBot}>Send</button>
      </div>
    </div>
  );
};

export default AIChat;
