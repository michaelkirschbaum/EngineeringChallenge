import {StyleSheet} from 'react-native';
import {createContext, useContext} from 'react';
import {useState} from 'react';


export const AuthContext = createContext({ authState: {id: "", username: "", signedIn: false}, setAuthState: () => {} });
import {View, Text} from '../components/Themed';

export default function LoginScreen() {
  const [username, setUsername] = useState('');

  return (
    <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder='Enter username'
        />

        <Button title='Login' onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
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