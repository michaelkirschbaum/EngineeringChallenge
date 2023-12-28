import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TextInput, Button} from 'react-native';
import {useState, useCallback} from 'react';
import axios from 'axios';

import {Text, View} from '../components/Themed';

let apiUrl: string =
  'https://fancy-dolphin-65b07b.netlify.app/api/machine-health';

if (__DEV__) {
  apiUrl = `http://${
    Platform?.OS === 'android' ? '10.0.2.2' : 'localhost'
  }:3001/login`;
}

export default function LoginScreen() {
  const [username, setUsername] = useState('');

  const login = useCallback(async () => {
    try {
        const response = await axios.post(apiUrl, {
          username: username,
        });
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder='Enter username'
      />
      <Button title='Login' onPress={login} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
