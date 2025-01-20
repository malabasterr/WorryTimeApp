import { View, Alert, Pressable, TextInput, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

  const router = useRouter();
  const [item, setItem] = useState('');

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
