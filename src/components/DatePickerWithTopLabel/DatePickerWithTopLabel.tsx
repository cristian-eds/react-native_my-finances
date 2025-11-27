import React, { Dispatch, SetStateAction, useState } from 'react';
import { Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './DatePickerWithTopLabelStyles';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { formaterIsoDateToDefaultPattern, formaterIsoDateToDefaultPatternWithTime } from '../../utils/DateFormater';

interface PickerWithTopLabelProps {
    title: string,
    required?: boolean,
    control: any,
    mode?: 'date' | 'datetime',
    name: string,
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> |undefined;
    showLabel?: boolean;
}

export function DatePickerWithTopLabel({ title, name, control, required=false, mode='date' ,errors, showLabel }: PickerWithTopLabelProps) {

    const [showPicker, setShowPicker] = useState<boolean>(false);

    const { field } = useController({
        name,
        control
      })

    const handleConfirmDate = (selectedDate: Date) => {
        field.onChange(selectedDate);
        setShowPicker(false);
    }

    const renderValueText = () => {
        let value = title;
        if(field.value) {
            value = mode === 'datetime' ? formaterIsoDateToDefaultPatternWithTime(new Date(field.value)) : formaterIsoDateToDefaultPattern(new Date(field.value));
        }
        return (
            <Text style={styles.inputText}>{value}</Text>
        )
    }

    return (
        <RowWithTopLabel title={title} onPress={() => setShowPicker(true)} required={required} errors={errors} showLabel={showLabel} value={field.value}>
            {renderValueText()}
            <Ionicons name="calendar-outline" size={24} color="black" />
            <DateTimePickerModal
                isVisible={showPicker}
                mode={mode}
                onConfirm={handleConfirmDate}
                onCancel={() => setShowPicker(false)}
                is24Hour={true}
            />
        </RowWithTopLabel>


    );
}