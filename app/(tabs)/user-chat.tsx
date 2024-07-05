import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../../styles';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server address

const UserChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Listen for incoming messages from psychiatrists
    socket.on('psychiatrist-message', (message) => {
      setChat((prevChat) => [...prevChat, { text: message.text, user: 'Psychiatrist' }]);
    });

    // Listen for incoming messages from other users
    socket.on('user-message', (message) => {
      setChat((prevChat) => [...prevChat, { text: message.text, user: 'Anonymous User' }]);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChat([...chat, { text: message, user: 'You' }]);
      socket.emit('user-message', { text: message }); // Emit message to server
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chat.map((msg, index) => (
          <View key={index} style={styles.message}>
            <Text style={styles.messageUser}>{msg.user}</Text>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserChatScreen;
