import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Linking, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../../styles';
import axios from 'axios'; // Import Axios for API requests

const PsychiatristRegister = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleEmail = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    if (!attachment) {
      Alert.alert('Error', 'Please attach proof of certification.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('description', description);
    formData.append('attachment', {
      uri: attachment,
      name: 'proof.pdf', // Adjust the name and type according to your file
      type: 'application/pdf',
    });

    try {
      const response = await axios.post('http://localhost:5000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Psychiatrist registered successfully.');
      } else {
        Alert.alert('Error', 'Registration failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error registering psychiatrist:', error);
      Alert.alert('Error', 'Registration failed. Please try again later.');
    }
  };

  const handleAttachment = async () => {
    const file = await DocumentPicker.getDocumentAsync({});
    if (file.type === 'success') {
      setAttachment(file.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a...</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Brief Description"
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAttachment}>
        <Text style={styles.buttonText}>Attach Proof of Certification</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Attach proof of certification and provide your email and a brief description before sending.</Text>
    </View>
  );
};

export default PsychiatristRegister;
