import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Update with your server address

const HelpChat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from users
    socket.on('user-message', (message) => {
      setChat((prevChat) => [...prevChat, { text: message.text, user: 'User' }]);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChat([...chat, { text: message, user: 'Psychiatrist' }]);
      socket.emit('psychiatrist-message', { text: message }); // Emit message to server
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Help Chat (Psychiatrist View)</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '8px', marginRight: '10px' }}
      />
      <button onClick={sendMessage} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Send</button>
    </div>
  );
};

export default HelpChat;
