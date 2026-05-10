import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RecoverScreen from './src/screens/RecoverScreen';
import { styles } from './src/styles';

export default function App() {
  const [screen, setScreen] = useState('login');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="auto" />
      {screen === 'login' && <LoginScreen onNavigate={setScreen} />}
      {screen === 'register' && <RegisterScreen onNavigate={setScreen} />}
      {screen === 'recover' && <RecoverScreen onNavigate={setScreen} />}
    </KeyboardAvoidingView>
  );
}
