import React from 'react';
import HomeScreen from './(tabs)/home';
import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Unmatched() {
  return (
    <View>
      <Link href="/home">Home</Link>
    </View>
  );
}