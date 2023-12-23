import {StyleSheet} from 'react-native';
import {createContext, useContext} from 'react';

import {View} from '../components/Themed';

export const AuthContext = createContext({ authState: {id: "", username: "", signedIn: false}, setAuthState: () => {} });

export default function LoginScreen() {
  return (
    <View></View>
  );
}

const styles = StyleSheet.create({});