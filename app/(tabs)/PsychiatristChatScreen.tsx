import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { styles } from '../../styles';

const PsychiatristChatScreen = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setChat([...chat, { text: message, user: 'Psychiatrist' }]);
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

export default PsychiatristChatScreen;
