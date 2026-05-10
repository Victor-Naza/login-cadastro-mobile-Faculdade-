import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { API_URL } from '../config';
import { styles } from '../styles';

export default function RecoverScreen({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRecover() {
    if (!email) {
      Alert.alert('Atencao', 'Informe seu email.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/recover-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert('Erro', data.message || 'Falha na recuperacao.');
      } else {
        Alert.alert('Sucesso', data.message, [
          { text: 'OK', onPress: () => onNavigate('login') },
        ]);
      }
    } catch (e) {
      Alert.alert('Erro de conexao', 'Verifique se o backend esta rodando e o IP esta correto.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recuperar senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleRecover} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onNavigate('login')}>
        <Text style={styles.link}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}
