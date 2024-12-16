import { StyleSheet, Platform, Text, TextInput, View, Pressable } from 'react-native';
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

export default function TabTwoScreen() {

  const [worryTime, setWorryTime] = useState(""); // To store the formatted time string
  const [time, setTime] = useState(new Date()); // To store the actual Date object
  const [showPicker, setShowPicker] = useState(false);
  const [duration, setDuration] = useState(); // To store the final selected duration
  const [tempDuration, setTempDuration] = useState(); // To store the temporary duration while selecting

  const toggleTimePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedTime) => {
    if (type === "set") {
      const currentTime = selectedTime || time;
      setTime(currentTime);

      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      if (Platform.OS === "android") {
        toggleTimePicker();
        setWorryTime(formattedTime);
      }
    } else {
      toggleTimePicker();
    }
  };

  const confirmIOSTime = () => {
    const formattedTime = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    setWorryTime(formattedTime);
    setDuration(tempDuration); // Set the final duration on confirm
    toggleTimePicker();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Worry Time is at</Text>
          <Text style={styles.title}>{duration ? `${duration} minutes` : "No set duration"}</Text>
        </View>

        {showPicker && (
          <View>
            <DateTimePicker
              mode="time"
              display="spinner"
              value={time}
              onChange={onChange}
              style={styles.timePicker}
              minuteInterval={5}
            />
            <Picker
              selectedValue={tempDuration} // Bind temporary state to the picker
              onValueChange={(selectedDuration) =>
                setTempDuration(selectedDuration)
              }>
                <Picker.Item label="5 minutes" value="5" />
                <Picker.Item label="10 minutes" value="10" />
                <Picker.Item label="15 minutes" value="15" />
                <Picker.Item label="20 minutes" value="20" />
                <Picker.Item label="25 minutes" value="25" />
                <Picker.Item label="30 minutes" value="30" />
                <Picker.Item label="35 minutes" value="35" />
                <Picker.Item label="40 minutes" value="40" />
                <Picker.Item label="45 minutes" value="45" />
                <Picker.Item label="50 minutes" value="50" />
                <Picker.Item label="55 minutes" value="55" />
                <Picker.Item label="60 minutes" value="60" />
            </Picker>
          </View>
        )}

        {showPicker && Platform.OS === "ios" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity onPress={toggleTimePicker}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmIOSTime}>
              <Text>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}

        {!showPicker && (
          <Pressable onPress={toggleTimePicker}>
            <TextInput
              style={styles.input}
              placeholder="No set time"
              value={worryTime}
              onChangeText={setWorryTime}
              editable={false}
              onPressIn={toggleTimePicker}
            />
          </Pressable>
        )}
        
        <Text style={styles.title}>for</Text>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'#355070',
  },
  titleContainer: {
    margin: 20,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#EAAC8B',
  },
  input: {
    fontSize: 40,
    color: '#EAAC8B',
  },
  timePicker: {
    height: 120,
    marginTop: -10,
    color: "red",
  }
});
