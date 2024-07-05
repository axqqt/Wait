import React, { useState } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  Alert, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const PsychiatristRegister = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);

  const baseURL = "https://wait-backend.vercel.app";

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
      name: 'proof.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post(`${baseURL}/register`, formData, {
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachment(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Register</Text>
          
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Brief Description"
            multiline
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleAttachment}
          >
            <Text style={styles.buttonText}>Attach Proof of Certification</Text>
          </TouchableOpacity>

          {attachment && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: attachment }} style={styles.image} />
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleEmail}
          >
            <Text style={styles.buttonText}>Submit Registration</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Attach proof of certification and provide your email and a brief description before sending.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  disclaimer: {
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
});

export default PsychiatristRegister;