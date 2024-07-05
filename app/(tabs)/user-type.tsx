import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

export default function UserTypeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a...</Text>
      <Link href="/user-chat" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>User Seeking Help</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/psychiatrist-login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Psychiatrist Login</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/psychatristRegister" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register Psychiatrist</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}