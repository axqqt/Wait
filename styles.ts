import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  message: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  messageUser: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});