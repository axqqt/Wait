import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { styles } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PsychiatristLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = "https://wait-backend.vercel.app";
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken) => {
    try {
      const response = await fetch(`${baseURL}/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login Successful!', 'You have successfully logged in.');
        navigation.navigate('UserChatScreen');
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      Alert.alert('Error', 'Failed to login with Google.');
    }
  };

  const handleEmailLogin = async () => {
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Login Successful!', 'You have successfully logged in.');
        navigation.navigate('UserChatScreen');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during email/password login:', error);
      Alert.alert('Error', 'Failed to login with email/password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Psychiatrist Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>


      <Text style={styles.infoText}>Login using your credentials to proceed.</Text>
    </View>
  );
};

export default PsychiatristLogin;
