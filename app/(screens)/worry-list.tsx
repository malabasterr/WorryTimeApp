import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Modal, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ViewListScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
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

  const handlePressItem = (item: string, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedIndex !== null) {
      try {
        const updatedItems = items.filter((_, index) => index !== selectedIndex);
        setItems(updatedItems);
        await AsyncStorage.setItem('shoppingList', JSON.stringify(updatedItems));
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    }
    setModalVisible(false);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={() => handlePressItem(item, index)} style={styles.item}>
      <Text style={styles.listItems}>{item}</Text>
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

      {/* Modal for Close/Delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{selectedItem}</Text>
            <View style={styles.modalButtonsContainer}>
              {/* <Button title="Close" onPress={handleClose} />
              <Button title="Delete" color="red" onPress={handleDelete} /> */}
              <Pressable onPress={handleClose}>
                <Text style={styles.closeButton}>Close</Text>
              </Pressable>
              <Pressable onPress={handleDelete}>
                <Text style={styles.deleteButton}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 20,
    borderBottomWidth: 1,
    backgroundColor: '#355070',
  },
  empty: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  listItems: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
  },
  submit: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  closeButton: {
    fontSize: 18,
    color:'#355070',
    textAlign: 'center',
    padding: 10,
    marginRight: 50,
  },
  deleteButton: {
    fontSize: 18,
    color:'red',
    textAlign: 'center',
    padding: 10,
    marginLeft: 50,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
});
