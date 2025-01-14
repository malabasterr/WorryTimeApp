// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Pressable, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRouter } from 'expo-router';

// export default function ViewListScreen() {
//   const [items, setItems] = useState<string[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const currentItems = await AsyncStorage.getItem('shoppingList');
//         if (currentItems) {
//           setItems(JSON.parse(currentItems));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchItems();
//   }, []);

//   const handlePressItem = (index: number) => {
//     router.push(/(screens)/${index}); // THIS LINE HERE
//   };

//   const renderItem = ({ item, index }: { item: string; index: number }) => (
//     <Pressable onPress={() => handlePressItem(index)} style={styles.item}>
//       <Text style={styles.listItems}>{item}</Text>
//     </Pressable>
//   );

//   return (
//     <View style={styles.mainContainer}>
//       <FlatList
//         data={items}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderItem}
//         ListEmptyComponent={<Text style={styles.empty}>No items yet.</Text>}
//       />
//       <Pressable onPress={() => router.push('/(tabs)/home')}>
//         <Text style={styles.submit}>Return</Text>
//       </Pressable>
//     </View>
//   );
// }