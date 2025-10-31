import React, { useEffect, useRef, useState } from 'react';
import { styles } from './PickerWithTopLabelStyles';

import { FieldError, useController } from 'react-hook-form';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { ItemDropdown } from '../../utils/mappers/itemsPickerMapper';
import DropDownPicker from 'react-native-dropdown-picker';


interface PickerWithTopLabelProps {
    labelText?: string;
    name: string;
    required?: boolean;
    errors?: FieldError | undefined;
    control: any;
    items: ItemDropdown[];
    zIndex?: number,
    zIndexInverse?: number,
    placeholder?: string;
    multiple?: boolean;
}

export function PickerWithTopLabel({ labelText, required, name, control, errors, items, zIndex = 1, zIndexInverse = 10000, placeholder = 'Selecione', multiple }: PickerWithTopLabelProps) {

    const { field } = useController({
        name,
        control
    });

    const [open, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState(field.value || (multiple ? [] : null));

    const prevValue = useRef(localValue);

    useEffect(() => {
        if (JSON.stringify(field.value) !== JSON.stringify(localValue)) {
            setLocalValue(field.value || (multiple ? [] : null));
        }
    }, [field.value]);

    useEffect(() => {
        prevValue.current = localValue;
    }, [localValue]);

    return (
        <RowWithTopLabel title={labelText} required={required} errors={errors} stylesProp={{ padding: 0 }} showLabel={labelText ? true : false} >
            <DropDownPicker
                value={localValue}
                open={open}
                setOpen={setOpen}
                setValue={setLocalValue}
                onChangeValue={(value: any) => {
                    
                    if (JSON.stringify(value) === JSON.stringify(prevValue.current)) {
                        return;
                    }
                    field.onChange(value);
                }}
                items={items}
                containerStyle={styles.container_picker}
                style={styles.picker}
                textStyle={styles.picker_text}
                dropDownContainerStyle={styles.dropdownList}
                placeholder={placeholder}
                maxHeight={200}
                listMode='FLATLIST'
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                multiple={multiple as boolean}
                mode="BADGE"
            />
        </RowWithTopLabel>

    );
}