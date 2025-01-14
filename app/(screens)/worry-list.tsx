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
    <View style={styles.mainContainer}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No items yet.</Text>}
      />
      <Pressable onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.submit}>Return</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#355070',
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
  },
  empty: {
    textAlign: 'center',
    fontSize: 10,
  },
  submit: {
    width: 150,
    height: 60,
    marginLeft: 100,
    marginBottom: 30,
    padding: 11,
    fontSize: 30,
    backgroundColor:'#EAAC8B',
    textAlign: 'center',
    borderWidth: 2,
  },
});
