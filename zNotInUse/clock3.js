import {Picker} from '@react-native-picker/picker';
import { View } from 'react-native';
import { useState } from 'react';

export default function TabTwoScreen() {
    const [selectedDuration, setSelectedDuration] = useState();
    return (
        <View>
            <Picker
                selectedValue={selectedDuration}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDuration(itemValue)
                }>
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="35" value="35" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="45" value="45" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="55" value="55" />
                <Picker.Item label="60" value="60" />
            </Picker>
        </View>
    )}