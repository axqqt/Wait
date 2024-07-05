import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('user-type'); // Navigate to UserTypeScreen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, Welcome to Kemi 👋🏻</Text>
      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
