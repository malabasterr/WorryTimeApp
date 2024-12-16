import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import React from 'react';

import { TabBarHomeIcon } from '@/components/navigation/TabBarHomeIcon';
import { TabBarClockIcon } from '@/components/navigation/TabBarClockIcon';

// TAB NAVIGATOR

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tabs.Screen
        name="home" //Clicking this takes you to the home.tsx file
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <TabBarHomeIcon name={focused ? 'home' : 'home-outline'} color={'#355070'} />
          ),
        }}
      />
      <Tabs.Screen
        name="clock" //Clicking this takes you to the clock.js file
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <TabBarClockIcon name={focused ? 'clockcircle' : 'clockcircleo'} color={'#355070'} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#7792B3',
    padding: 10,
  },
});
