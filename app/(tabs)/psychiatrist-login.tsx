import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { styles } from '../../styles';
import React, { useState } from 'react';

const PsychiatristLogin = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // You can send the id_token to your backend for further processing
      console.log('Received id_token:', id_token);
      Alert.alert('Login Successful!', 'You have successfully logged in.');
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Psychiatrist Login</Text>
      
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      
      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Login using your Gmail credentials to proceed.</Text>
    </View>
  );
};

export default PsychiatristLogin;
