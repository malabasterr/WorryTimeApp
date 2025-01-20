import React from 'react';
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function StartWorryTimeScreen() {
  const router = useRouter();
  const [accessNumber, setAccessNumber] = useState(0);

  useEffect(() => {
    const loadNumber = async () => {
      const storedNumber = await AsyncStorage.getItem('storedNumber');
      if (storedNumber) {
        setAccessNumber(parseInt(storedNumber, 10));
      }
    };

    loadNumber();
  }, []);

  const incrementAccessNumber = async () => {
    const newAccessNumber = accessNumber + 1;
    setAccessNumber(newAccessNumber);
    await AsyncStorage.setItem('storedNumber', newAccessNumber.toString());
  };

  const goToWorryList = () => {
    router.push('/(screens)/worry-list');
    incrementAccessNumber();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.messageContainer}>
          <Text style={styles.message}>
              You’ve recorded your worries. 
              Now it’s time to go through them before you can add more.
          </Text>
        </View>
        <Pressable onPress={goToWorryList}>
            <Text style={styles.startButton}>Start Worry Time</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    padding: 20,
    backgroundColor:'#355070',
  },
  messageContainer: {
  },
  message: {
    textAlign: 'center',
    fontSize: 30,
    color: '#EAAC8B',
  },
  startButton: {
    width: 250,
    height: 60,
    marginBottom: 30,
    marginTop: 30,
    padding: 11,
    fontSize: 30,
    backgroundColor:'#EAAC8B',
    textAlign: 'center',
    borderWidth: 2,
  },
});
