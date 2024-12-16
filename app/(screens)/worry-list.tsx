import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ViewListScreen() {
  const [items, setItems] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const currentItems = await AsyncStorage.getItem('shoppingList');
        if (currentItems) {
          setItems(JSON.parse(currentItems));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handlePressItem = (index: number) => {
    router.push(`/(screens)/${index}`); // Navigate to dynamic route segment with item index
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={() => handlePressItem(index)} style={styles.item}>
      <Text>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No items yet.</Text>}
      />
      <Button title="Return" onPress={() => router.push('/(tabs)/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
  },
  empty: {
    textAlign: 'center',
    fontSize: 18,
  },
});
