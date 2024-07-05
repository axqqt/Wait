import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('user-type'); // Navigate to UserTypeScreen
  };

  const handleGoBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, Welcome to Kemi 👋🏻</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
