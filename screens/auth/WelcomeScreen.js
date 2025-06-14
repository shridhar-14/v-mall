import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const scale = new Animated.Value(0.8);

  useEffect(() => {
    // Animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        style={[styles.logo, { transform: [{ scale }] }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>V-Mall</Text>
      <Text style={styles.subtitle}>Smart & Elegant Way Of Shopping</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F8FAFC', // fallback color
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 30,
    borderRadius: 70,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FF3B30', // bright red
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: '#00000040',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#1E90FF', // vivid blue
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 16,
    lineHeight: 26,
  },
});