import { Link } from 'expo-router';
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi , Welcome to Kemi 👋🏻</Text>
      <Link href="/user-type" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}