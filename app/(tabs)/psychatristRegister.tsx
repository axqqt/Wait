import  { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Linking } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'; // Import DocumentPicker for file selection
import { styles } from '../../styles';

const PsychiatristLogin = () => {
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null); // State to hold attachment URI

  const handleEmail = async () => {
    if (!email.trim()) {
      alert('Please enter your email.');
      return;
    }

    if (!attachment) {
      alert('Please attach proof of certification.');
      return;
    }

    const body = `${description}\n\nPlease find attached proof of certification.`;
    const subject = 'Psychiatrist Registration';

    // Construct mailto link with attachment
    Linking.openURL(`mailto:imveloxal@gmail.com?subject=${subject}&body=${body}&attachment=${attachment}`);
  };

  const handleAttachment = async () => {
    const file = await DocumentPicker.getDocumentAsync({}); // Open document picker to select files
    if (file.type === 'success') {
      setAttachment(file.uri); // Save the URI of the selected attachment
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am a...</Text>
      
      {/* Email Input */}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Your Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Description Input */}
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Brief Description"
        multiline
      />
      
      {/* Attach File Button */}
      <TouchableOpacity style={styles.button} onPress={handleAttachment}>
        <Text style={styles.buttonText}>Attach Proof of Certification</Text>
      </TouchableOpacity>
      
      {/* Send Email Button */}
      <TouchableOpacity style={styles.button} onPress={handleEmail}>
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>

      <Text style={styles.infoText}>Attach proof of certification and provide your email and a brief description before sending. You will receive an response in 36-48 Hours</Text>
    </View>
  );
};

export default PsychiatristLogin;
