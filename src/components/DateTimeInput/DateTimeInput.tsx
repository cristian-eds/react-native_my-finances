import React, { useState } from 'react';
import { FieldErrors, useController } from 'react-hook-form';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Text, TouchableOpacity } from 'react-native';
import { RowWithLeftLabel } from '../RowWithLeftLabel/RowWithLeftLabel';

import { formaterIsoDateToDefaultPatternWithTime } from '../../utils/DateFormater';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './DateTimeInputSyles';

interface DateTimeInputProps {
  labelText: string,
  name: string;
  required?: boolean;
  errors?: FieldErrors | undefined;
  control: any;
}

export function DateTimeInput({ labelText, name, required, errors, control }: DateTimeInputProps) {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {field} = useController({
      name,
      control,
    })

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (selectedDate: Date) => {
    field.onChange(selectedDate)
    hideDatePicker();
  };

  return (
    <RowWithLeftLabel labelText={labelText} required={required}>
      <TouchableOpacity onPress={showDatePicker} style={styles.input}>
        <Text style={styles.text_input}>{formaterIsoDateToDefaultPatternWithTime(new Date(field.value))}</Text>
        <Ionicons name="chevron-down" size={24} color="black" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        is24Hour={true}
        
      />
    </RowWithLeftLabel>
  );
}