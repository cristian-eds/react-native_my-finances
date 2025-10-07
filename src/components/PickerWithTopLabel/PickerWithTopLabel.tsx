import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './PickerWithTopLabelStyles';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface PickerWithTopLabelProps {
    date: Date | undefined,
    setDate: Dispatch<SetStateAction<Date>>,
    title: string
}

export function PickerWithTopLabel({date, setDate, title}: PickerWithTopLabelProps) {

    const [showPicker, setShowPicker] = useState<boolean>(false);

    const handleConfirmDate = (date: Date) => {
        setDate(date);
        setShowPicker(false);
    }

    return (
        <View style={styles.containerInput} >
            <Text style={styles.inputLabel}>{title}</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                <Text style={styles.inputText}>{date?.toLocaleDateString()}</Text>
                <Ionicons name="calendar-outline" size={24} color="black" />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={showPicker}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setShowPicker(false)}
                is24Hour={true}
            />
        </View>
    );
}