import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !mobile || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      mobile,
      email: email.trim().toLowerCase(),
      password,
    };
    await AsyncStorage.setItem('localUser', JSON.stringify(newUser));
    Alert.alert('Success', 'Signup successful. Please login.');
    navigation.navigate('Login');
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
              <Text style={styles.tagText}>🌟 Join the V-Mall Family 🌟</Text>
            </View>

            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Mobile"
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#aaa"
            />

            <Pressable style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupButtonText}>🚀 Sign Up</Text>
            </Pressable>

            <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
              Already have an account?{' '}
              <Text style={styles.linkBold}>Login</Text>
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
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    fontSize: 16,
    color: '#333',
    elevation: 2,
  },
  signupButton: {
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
  signupButtonText: {
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

export default SignupScreen;