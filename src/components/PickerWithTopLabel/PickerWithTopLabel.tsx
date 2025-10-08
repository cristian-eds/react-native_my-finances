import React, { useState } from 'react';
import { styles } from './PickerWithTopLabelStyles';

import { FieldError, useController } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { MovementType } from '../../domain/enums/movementTypeEnum';

interface PickerWithTopLabelProps<T> {
    labelText: string;
    name: string;
    required?: boolean;
    errors?: FieldError | undefined;
    control: any;
    optionsEnum: T
}

type PickerEnums = typeof MovementType | typeof TypeAccount;

export function PickerWithTopLabel({ labelText, required, name, control, errors, optionsEnum }: PickerWithTopLabelProps<PickerEnums>) {

    const { field } = useController({
        name,
        control,
    });

    const itemsToDropDown = Object.keys(optionsEnum).map((text) => { return { label: text, value: optionsEnum[text as keyof typeof optionsEnum] } })
    const [open, setOpen] = useState(false);


    return (
        <RowWithTopLabel title={labelText} required={required} errors={errors} stylesProp={{padding:0}} >
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
                containerStyle={styles.container_picker}
                style={styles.picker}
                textStyle={styles.picker_text}
                dropDownContainerStyle={styles.dropdownList}
                placeholder='Selecione um item'
                maxHeight={200}
                listMode='SCROLLVIEW'

            />
        </RowWithTopLabel>

    );
}