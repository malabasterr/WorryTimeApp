import { StyleSheet, Platform, Text, TextInput, View, Pressable } from 'react-native';
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

export default function ClockScreen() {

  const [worryTime, setWorryTime] = useState(""); // To store the formatted time string
  const [worryDuration, setWorryDuration] = useState("");
  const [time, setTime] = useState(new Date()); // To store the actual Date object
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [tempDuration, setTempDuration] = useState(); // To store the temporary duration while selecting

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const toggleDurationPicker = () => {
    setShowDurationPicker(!showDurationPicker);
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
    toggleTimePicker();
  };

  const confirmDuration = () => {
    setWorryDuration(tempDuration);
    toggleDurationPicker();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Worry Time</Text>
          <Text style={styles.subtitle}>is currently set to:</Text>
        </View>

        <View style={styles.pickerContainer}>

          {showTimePicker && (
            <DateTimePicker
              mode="time"
              display="spinner"
              value={time}
              onChange={onChange}
              style={styles.timePicker}
              minuteInterval={5}
            />
          )}

          {showTimePicker && Platform.OS === "ios" && (
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

          {!showTimePicker && (
            <Pressable onPress={toggleTimePicker}>
              <TextInput
                style={styles.timeInput}
                placeholder="set time"
                value={worryTime}
                onChangeText={setWorryTime}
                editable={false}
                onPressIn={toggleTimePicker}
              />
            </Pressable>
          )}

          <Text style={styles.for}>for</Text>

          {showDurationPicker && (
            <View>
              <Picker
                style={styles.durationPicker}
                selectedValue={tempDuration} // Bind temporary state to the picker
                onValueChange={(selectedDuration) =>
                  setTempDuration(selectedDuration)
                }>
                  <Picker.Item label="5 minutes" value="5 minutes" />
                  <Picker.Item label="10 minutes" value="10 minutes" />
                  <Picker.Item label="15 minutes" value="15 minutes" />
                  <Picker.Item label="20 minutes" value="20 minutes" />
                  <Picker.Item label="25 minutes" value="25 minutes" />
                  <Picker.Item label="30 minutes" value="30 minutes" />
                  <Picker.Item label="35 minutes" value="35 minutes" />
                  <Picker.Item label="40 minutes" value="40 minutes" />
                  <Picker.Item label="45 minutes" value="45 minutes" />
                  <Picker.Item label="50 minutes" value="50 minutes" />
                  <Picker.Item label="55 minutes" value="55 minutes" />
                  <Picker.Item label="60 minutes" value="60 minutes" />
              </Picker>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableOpacity onPress={toggleDurationPicker}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDuration}>
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

            {!showDurationPicker && (
              <Pressable onPress={toggleDurationPicker}>
                <TextInput
                  style={styles.durationInput}
                  placeholder="set duration"
                  value={worryDuration}
                  onChangeText={setWorryDuration}
                  editable={false}
                  onPressIn={toggleDurationPicker}
                />           
              </Pressable>
            )}

        </View>

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
    fontSize: 50,
    color: '#EAAC8B',
  },
  subtitle: {
    fontSize: 30,
    color: '#EAAC8B',
  },
  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: 'purple',
  },
  timeInput: {
    fontSize: 50,
    color: 'white',
    paddingBottom: 30,
  },
  durationInput: {
    fontSize: 50,
    color: 'white',
    paddingTop: 30,
  },
  for: {
    fontSize: 40,
    color: '#EAAC8B',
  },
  timePicker: {
    backgroundColor: 'black',
  },
  durationPicker: {
    backgroundColor: 'green',
    width: 250,
  }
});
