import React, { ReactElement, useState } from 'react';
import { styles } from './PickerWithTopLabelStyles';

import { FieldError, useController } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';

interface ItemDropdown {
    label: string,
    value: string,
    icon?: () => ReactElement
}

interface PickerWithTopLabelProps {
    labelText: string;
    name: string;
    required?: boolean;
    errors?: FieldError | undefined;
    control: any;
    items: ItemDropdown[];
    zIndex?: number,
    zIndexInverse?: number
}

export function PickerWithTopLabel({ labelText, required, name, control, errors, items, zIndex = 1, zIndexInverse = 10000 }: PickerWithTopLabelProps) {

    const { field } = useController({
        name,
        control
    });
    
    const [open, setOpen] = useState(false);

    return (
        <RowWithTopLabel title={labelText} required={required} errors={errors} stylesProp={{ padding: 0 }} >
            <DropDownPicker
                value={field.value}
                open={open}
                setOpen={setOpen}
                setValue={
                    (callback) => {
                        const newValue = callback(field.value);
                        field.onChange(newValue)
                    }
                }
                items={items}
                containerStyle={styles.container_picker}
                style={styles.picker}
                textStyle={styles.picker_text}
                dropDownContainerStyle={styles.dropdownList}
                placeholder='Selecione'
                maxHeight={200}
                listMode='FLATLIST'
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}

            />
        </RowWithTopLabel>

    );
}