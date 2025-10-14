import React, { ReactElement, useState } from 'react';
import { styles } from './PickerWithTopLabelStyles';

import { FieldError, useController } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { MovementType } from '../../domain/enums/movementTypeEnum';

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
    items: ItemDropdown[]
}

type PickerEnums = typeof MovementType | typeof TypeAccount;

export function PickerWithTopLabel({ labelText, required, name, control, errors, items }: PickerWithTopLabelProps) {

    const { field } = useController({
        name,
        control,
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
                placeholder='Selecione um item'
                maxHeight={200}
                listMode='SCROLLVIEW'

            />
        </RowWithTopLabel>

    );
}