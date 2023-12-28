import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TextInput, Button} from 'react-native';
import {useState, useCallback} from 'react';
import axios from 'axios';

import {Text, View} from '../components/Themed';
import {useAuth} from './context/auth'

let apiUrl: string =
  'https://fancy-dolphin-65b07b.netlify.app/api/machine-health';

if (__DEV__) {
  apiUrl = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001/login`;
}

export default function LoginScreen() {
  const [username, setUsername] = useState('');

  const { setAuthState } = useAuth();

  const login = useCallback(async () => {
    try {
        const response = await axios.post(apiUrl, {
          username: username,
        });

        if (response.data?.success) {
          setAuthState({
            token: response.data.token,
            signedIn: response.data.success
          });
        }
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <View style={styles.separator} />
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder='Enter username'
      />
      <Button title='Submit' onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
