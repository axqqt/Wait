import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: 'rgba(74, 144, 226, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  
  input: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginVertical: 10,
    fontSize: 16,
  },
  
  chatContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  
  message: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 18,
    marginVertical: 10,
    maxWidth: '80%',
  },
  
  messageUser: {
    fontWeight: '600',
    marginBottom: 5,
    color: '#4a90e2',
  },
  
  messageSent: {
    backgroundColor: '#4a90e2',
    alignSelf: 'flex-end',
  },
  
  messageSentText: {
    color: 'white',
  },
  
  messageReceived: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  
  messageReceivedText: {
    color: '#333',
  },
  
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 600,
    marginTop: 20,
  },
  
  chatInput: {
    flex: 1,
    padding: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginRight: 10,
  },
  
  sendButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});