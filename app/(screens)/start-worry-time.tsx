import React from 'react';
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useRouter } from 'expo-router';


export default function StartWorryTimeScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
        <Text style={styles.message}>
            You’ve recorded your worries. 
            Now it’s time to go through them before you can add more.
        </Text>
        {/* Will need to be altered with actual route path */}
        <Pressable onPress={() => router.push('/(tabs)/home')}>
            <Text style={styles.startButton}>Start Worry Time</Text>
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
