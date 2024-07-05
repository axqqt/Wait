import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import io from "socket.io-client";
import { styles } from "../../styles"; // Ensure styles are imported correctly
  const baseURL = "https://wait-backend.vercel.app"

const socket = io(baseURL);

const UserChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("user-message", (message) => {
      setChat((prevChat) => [...prevChat, { text: message.text, user: "Anonymous User" }]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      setChat([...chat, { text: message, user: "You" }]);
      socket.emit("user-message", { text: message });
      setMessage("");
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
