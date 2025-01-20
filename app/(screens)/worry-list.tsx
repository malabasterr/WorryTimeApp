import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ViewListScreen() {
  const [items, setItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  // Collects required info for the page- worries and timer duration
  useEffect(() => {

    // Collect saved worries and convert into list
    const fetchItems = async () => {
      try {
        const currentItems = await AsyncStorage.getItem('worryList');
        if (currentItems) {
          setItems(JSON.parse(currentItems));
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Collect saved duration from clock.js and convert into seconds
    const fetchTimerDuration = async () => {
      try {
        const savedDuration = await AsyncStorage.getItem('worryDuration');
        if (savedDuration) {
          const durationInMinutes = parseInt(savedDuration.split(' ')[0], 10);
          setTimeLeft(durationInMinutes * 60); // Set fetched duration
        } else {
          setTimeLeft(60); // Default to 1 minute if no time found
        }
      } catch (error) {
        console.log('Error fetching duration:', error);
        setTimeLeft(60); // Default to 1 minute in case of error
      }
    };
    fetchItems();
    fetchTimerDuration();
  }, []);

  // Function to handle when user taps on one of the items in the list
  const handlePressItem = (item: string, index: number) => {
    setSelectedItem(item);
    setSelectedIndex(index);
    setItemModalVisible(true);
  };

  // Function to delete item from list
  const handleDelete = async () => {
    if (selectedIndex !== null) {
      try {
        const updatedItems = items.filter((_, index) => index !== selectedIndex);
        setItems(updatedItems);
        await AsyncStorage.setItem('worryList', JSON.stringify(updatedItems));
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    }
    setItemModalVisible(false);
  };

  // Function to close the pop-up that appears when an item is tapped
  const handleClose = () => {
    setItemModalVisible(false);
  };

  // Renders each item as a pressable component
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Pressable onPress={() => handlePressItem(item, index)} style={styles.item}>
      <Text style={styles.listItems}>{item}</Text>
    </Pressable>
  );

  // Removes all items from list
  const clearList = async () => {
    try {
      setItems([]);
      await AsyncStorage.setItem('worryList',JSON.stringify([]));
    } catch (error) {
      console.log('Error clearing remaining items from list', error);
    }
  }

  // Creates timer from the saved duration above
  useEffect(() => {
    if (timeLeft === null) return; // Skip if timer is not initialised
    if (timeLeft <= 0) {
      setTimerModalVisible(true); // Show modal only when time reaches 0
      clearList();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime !== null ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer); // Clean up on unmount
  }, [timeLeft]);

  // Converts time into readable format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Function to handle the navigation away from the page when complete
  const handleBackToHome = () => {
    setTimerModalVisible(false);
    router.push('/(screens)/not-cleared');
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.messageContainer}>
            {/* Message that shows when the user has no worries on their list */}
            <Text style={styles.message}>
              Well done for clearing your worries! 
              Now it's time to refocus on something else.
              Remember to keep writing down your worries for your next worry time.
            </Text>
            <Pressable onPress={() => router.push('/(tabs)/home')}>
              <Text style={styles.submit}>Close</Text>
            </Pressable>
          </View>
        }
      />
      <Text style={styles.timerText}>
        <Text>Time remaining: </Text>
        {timeLeft !== null && timeLeft > 0 ? formatTime(timeLeft) : "Time's Up!"}
      </Text>

      {/* Timer Modal */}
      <Modal
        transparent={true}
        visible={timerModalVisible}
        animationType="slide"
        onRequestClose={() => setTimerModalVisible(false)}
      >
        <View style={styles.timerModalOverlay}>
          <View style={styles.timerModalContent}>
            <Text style={styles.timerModalText}>Time's Up!</Text>
            <Pressable style={styles.timerModalButton} onPress={handleBackToHome}>
              <Text style={styles.timerModalButtonText}>Back to Home</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Eventually this will be removed as we don't want them to be able to navigate back to the homepage! */}
      <Pressable onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.submit}>Return</Text>
      </Pressable>

      {/* Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={itemModalVisible}
        onRequestClose={handleClose}
      >
        <View style={styles.itemModalContainer}>
          <View style={styles.itemModalContent}>
            <Text style={styles.itemModalText}>{selectedItem}</Text>
            <View style={styles.itemModalButtonsContainer}>
              <Pressable onPress={handleClose}>
                <Text style={styles.closeButton}>Close</Text>
              </Pressable>
              <Pressable onPress={handleDelete}>
                <Text style={styles.deleteButton}>Remove Worry</Text>
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
    alignItems: 'center',
    paddingTop: 50,
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
    padding: 50,
  },
  listItems: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
  },
  timerText: {
    fontSize: 30,
    color: '#EAAC8B',
  },
  timerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  timerModalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#355070',
  },
  timerModalButton: {
    backgroundColor: '#EAAC8B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  timerModalButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  submit: {
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
  itemModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  itemModalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemModalButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  closeButton: {
    fontSize: 18,
    color:'#355070',
    textAlign: 'center',
    padding: 10,
    marginRight: 40,
  },
  deleteButton: {
    fontSize: 18,
    color:'red',
    textAlign: 'center',
    padding: 10,
    marginLeft: 30,
  },
  itemModalText: {
    fontSize: 22,
    marginBottom: 20,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 150,
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
});
