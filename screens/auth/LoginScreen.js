import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('localUser');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (
          parsed.email === email.trim().toLowerCase() &&
          parsed.password === password
        ) {
          await AsyncStorage.setItem('access_token', 'local_dummy_token');
          login('local_dummy_token', 'local_dummy_refresh_token');
          return;
        } else {
          Alert.alert('Login Failed', 'Incorrect email or password.');
          return;
        }
      }

      Alert.alert('Login Failed', 'No user found. Please sign up first.');
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.tag}>
              <Text style={styles.tagText}>✨ Welcome to V-Mall ✨</Text>
            </View>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            <Pressable style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>🚀 Login</Text>
            </Pressable>

            <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
              Don’t have an account?{' '}
              <Text style={styles.linkBold}>Sign up</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F1F7FF',
  },
  container: {
    padding: 24,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 24,
    borderRadius: 60,
    backgroundColor: '#fff',
    elevation: 5,
  },
  tag: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 30,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  loginButton: {
    backgroundColor: '#34C759', // vibrant green
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    shadowColor: '#34C759',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
    fontSize: 15,
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default LoginScreen;
