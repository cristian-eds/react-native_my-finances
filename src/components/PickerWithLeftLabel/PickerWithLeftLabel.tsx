import React, { useState } from 'react';
import { styles } from './PickerWithLeftLabelStyles';

import { RowWithLeftLabel } from '../RowWithLeftLabel/RowWithLeftLabel';
import { FieldError, useController } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { TypeAccount } from '../../domain/typeAccountEnum';

interface PickerWithLeftLabelProps {
    labelText: string;
    name: string;
    required?: boolean;
    errors?: FieldError | undefined;
    control: any;
}

export function PickerWithLeftLabel({ labelText, required, name, control, errors }: PickerWithLeftLabelProps) {

    const { field } = useController({
        name,
        control,
        defaultValue: TypeAccount.Corrente
    });

    const itemsToDropDown = Object.keys(TypeAccount).map((text) => { return { label: text, value: TypeAccount[text as keyof typeof TypeAccount] } })
    const [open, setOpen] = useState(false);


    return (
        <RowWithLeftLabel labelText={labelText} required={required} errors={errors} >
            <DropDownPicker
                value={field.value}
                open={open}
                setOpen={setOpen}
                setValue={
                    (callback) => {
                        const newValue = callback(field.value);
                        field.onChange(newValue)}
                }
                items={itemsToDropDown}
                containerStyle={styles.cotainer_picker}
                style={styles.picker}
                textStyle={styles.picker_text}
                dropDownContainerStyle={styles.dropdownList}
                placeholder='Selecione um item'
                maxHeight={200}
                listMode='SCROLLVIEW'

            />
        </RowWithLeftLabel>

    );
}