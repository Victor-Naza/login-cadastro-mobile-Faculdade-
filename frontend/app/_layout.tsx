import { Stack } from 'expo-router';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../src/styles';

export default function RootLayout() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: '#f2f4f7',
            flex: 1,
            justifyContent: 'center',
            padding: 20,
          },
        }}
      />
    </KeyboardAvoidingView>
  );
}
