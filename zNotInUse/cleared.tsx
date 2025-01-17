import React from 'react';
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useRouter } from 'expo-router';


export default function ClearedScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
        <Text style={styles.title}>Worry time over!</Text>
        <Text style={styles.message}>
        Well done for clearing your worries! 
        Now it's time to refocus on something else.
        Remember to keep writing down your worries for your next worry time.
        </Text>
        <Pressable onPress={() => router.push('/(tabs)/home')}>
            <Text style={styles.startButton}>Close</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    padding: 20,
    backgroundColor:'#355070',
  },
  title: {
    fontSize: 50,
    color: '#EAAC8B',
  },
  message: {
    fontSize: 30,
    color: '#EAAC8B',
  },
  startButton: {
    width: 150,
    height: 60,
    marginLeft: 100,
    marginBottom: 30,
    marginTop: 10,
    padding: 11,
    fontSize: 30,
    backgroundColor:'#EAAC8B',
    textAlign: 'center',
    borderWidth: 2,
  },
});
