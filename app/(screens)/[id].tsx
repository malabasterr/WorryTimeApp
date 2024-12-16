import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemsString = await AsyncStorage.getItem('shoppingList');
        if (itemsString) {
          const items = JSON.parse(itemsString);
          const index = parseInt(id, 10);
          if (!isNaN(index) && index >= 0 && index < items.length) {
            setItem(items[index]);
          } else {
            console.log('Invalid itemId or index out of bounds');
            setItem(null);
          }
        } else {
          console.log('No items found in AsyncStorage');
        }
      } catch (error) {
        console.log('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    try {
      const itemsString = await AsyncStorage.getItem('shoppingList');
      if (itemsString) {
        let items = JSON.parse(itemsString);
        const index = parseInt(id, 10);
        if (!isNaN(index) && index >= 0 && index < items.length) {
          items = items.filter((_: string, idx: number) => idx !== index);
          await AsyncStorage.setItem('shoppingList', JSON.stringify(items));
          router.push('/worry-list');
        } else {
          console.log('Invalid itemId or index out of bounds');
        }
      }
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  };

  const handleClose = () => {
    router.push('/worry-list');
  };

  if (item === null) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.itemDetail}>{item}</Text>
      <Button title="Close" onPress={handleClose} />
      <Button title="Delete" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  itemDetail: {
    fontSize: 24,
    marginBottom: 20,
  },
});
