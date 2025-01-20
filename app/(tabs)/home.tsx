import { View, Alert, Pressable, TextInput, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();
  const [item, setItem] = useState('');
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

///////////////// This is the redirect logic. Comment and un-comment as neccessary

  const [worryTime, setWorryTime] = useState(""); // To store the formatted time string

  
  useEffect(() => {
    const loadWorrySettings = async () => {
      const savedTime = await AsyncStorage.getItem('worryTime');

      if (savedTime) setWorryTime(savedTime);
    };

    loadWorrySettings();
  }, []);

  const saveWorrySettings = async (time: string) => {
    if (time) await AsyncStorage.setItem('worryTime', time);
  };

  // Redirect logic
  useEffect(() => {
    const checkRedirect = async () => {
      if (!worryTime) return;
  
      const [hour, minute] = worryTime.split(':').map(Number); // Parse the worryTime
      const worryDateTime = new Date();
      worryDateTime.setHours(hour, minute, 0, 0);
  
      const now = new Date();

      // Fetch accessNumber from AsyncStorage
      const storedNumber = await AsyncStorage.getItem('storedNumber');
      const currentAccessNumber = storedNumber ? parseInt(storedNumber, 10) : 0;
  
      // Check if current time is after worryTime and before midnight
      if (now >= worryDateTime && now.getDate() === worryDateTime.getDate() && currentAccessNumber < 5) {
        router.push('/(screens)/start-worry-time'); // Redirect to another screen
      }
    };
  
    checkRedirect();
  }, [worryTime]);

  ///////////////////////

  const saveItem = async () => {
    if (item.trim()) {
      try {
        const currentItems = await AsyncStorage.getItem('worryList');
        const itemList = currentItems ? JSON.parse(currentItems) : [];
        itemList.push(item);
        await AsyncStorage.setItem('worryList', JSON.stringify(itemList));
        Alert.alert(`Well done for recording your worry!`, `It's saved for worry time. Now it's time to refocus on something else.`);
        setItem('');
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'There was an error saving the item.');
      }
    } else {
      Alert.alert('Input Error', 'Please enter an item.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What is your worry?</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter your worry here..."
          value={item}
          onChangeText={setItem}
          keyboardType="default"
          enterKeyHint='enter'
          maxLength={1000}
          textAlign='left'
        />
      </View>
        <Pressable onPress={saveItem} >
        <Text style={styles.submit}>Save</Text>
        </Pressable>

        
      {/* Eventually these will be removed as we don't want them to be able to navigate back to start or list! */}
      <Pressable onPress={() => router.push('/(screens)/worry-list')}>
        <Text style={styles.submit}>List</Text>
      </Pressable>
      <Pressable onPress={() => router.push('/(screens)/start-worry-time')}>
        <Text style={styles.submit}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'#355070',
  },
  titleContainer: {
    margin: 20,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    color: '#EAAC8B',
  },
  input: {
    height: 280,
    width: 320,
    marginLeft: 35,
    borderWidth: 2,
    backgroundColor: 'white',
    },
  submit: {
    width: 150,
    height: 60,
    marginLeft: 110,
    padding: 11,
    fontSize: 30,
    backgroundColor:'#EAAC8B',
    textAlign: 'center',
    borderWidth: 2,
  },
  form: {
    marginBottom: 40,
  },
});
