import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';

const PsychiatristRegister = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState<string | null>(null);

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
      name: 'proof.jpg', // Adjust the name and type according to your file
      type: 'image/jpeg', // Assuming the image type is JPEG, adjust as needed
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setAttachment(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{margin:"60px", fontSize:"40px"}}>Register</Text>
      <TextInput
        style={{ width: '80%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={{ width: '80%', height: 100, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        value={description}
        onChangeText={setDescription}
        placeholder="Brief Description"
        multiline
      />

      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, marginBottom: 10 }}
        onPress={handleAttachment}
      >
        <Text style={{ color: 'white' }}>Attach Proof of Certification</Text>
      </TouchableOpacity>

      {attachment && (
        <View style={{ width: '80%', height: 200, marginBottom: 10 }}>
          <Image source={{ uri: attachment }} style={{ width: '100%', height: '100%' }} />
        </View>
      )}

      <TouchableOpacity
        style={{ backgroundColor: 'green', padding: 10 }}
        onPress={handleEmail}
      >
        <Text style={{ color: 'white' }}>Send Email</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, width: '80%', textAlign: 'center', fontSize: 12 }}>
        Attach proof of certification and provide your email and a brief description before sending.
      </Text>
    </View>
  );
};

export default PsychiatristRegister;
