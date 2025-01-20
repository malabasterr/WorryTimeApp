import React from 'react';
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import { useRouter } from 'expo-router';


export default function NotClearedScreen() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
        <Text style={styles.title}>Worry time over!</Text>
        <Text style={styles.message}>
        Today’s remaining worries have been cleared for you.
        Now it's time to refocus on something else.
        Remember to keep writing down your worries for your next worry time.
        </Text>
        <Pressable onPress={() => router.push('/(tabs)/home')}>
            <Text style={styles.closeButton}>Close</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 50,
    padding: 20,
    backgroundColor:'#355070',
  },
  title: {
    fontSize: 50,
    color: '#EAAC8B',
    marginBottom: 30,
  },
  message: {
    fontSize: 30,
    textAlign: 'center',
    color: '#EAAC8B',
    marginBottom: 30,
  },
  closeButton: {
    width: 150,
    height: 60,
    marginBottom: 30,
    marginTop: 10,
    padding: 11,
    fontSize: 30,
    backgroundColor:'#EAAC8B',
    textAlign: 'center',
    borderWidth: 2,
  },
});