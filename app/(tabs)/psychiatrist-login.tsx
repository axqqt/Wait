import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { styles } from '../../styles';

const PsychiatristLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Send id_token to your backend for further processing
      console.log('Received id_token:', id_token);
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken) => {
    try {
      const response = await fetch('http://localhost:5000/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      console.log(data);
      // Handle response from backend (e.g., save token, navigate user)
      Alert.alert('Login Successful!', 'You have successfully logged in.');
    } catch (error) {
      console.error('Error during Google login:', error);
      Alert.alert('Error', 'Failed to login with Google.');
    }
  };

  const handleEmailLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      // Handle response from backend (e.g., save token, navigate user)
      Alert.alert('Login Successful!', 'You have successfully logged in.');
    } catch (error) {
      console.error('Error during email/password login:', error);
      Alert.alert('Error', 'Failed to login with email/password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Psychiatrist Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleEmailLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#DB4437' }]}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={[styles.buttonText, { color: 'white' }]}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Login using your credentials to proceed.</Text>
    </View>
  );
};

export default PsychiatristLogin;
