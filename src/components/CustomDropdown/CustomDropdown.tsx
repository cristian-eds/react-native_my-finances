import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './CustomDropdownStyles';

interface CustomDropdownProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    enableItemsToDrop: { label: string; value: string | number }[];
    placeholder: string;
    zIndex?: number;
    zIndexInverse?: number;
}

export function CustomDropdown({ value, setValue, enableItemsToDrop, placeholder, zIndex = 1000, zIndexInverse = 100 }: CustomDropdownProps) {

    const [open, setOpen] = useState(false);

    return (
        <DropDownPicker
            open={open}
            setOpen={setOpen}
            items={enableItemsToDrop}
            setValue={setValue}
            value={value}
            style={styles.dropDownStyle}
            containerStyle={styles.container}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            labelStyle={styles.labelStyle}
            placeholder={placeholder}
            placeholderStyle= {{ textAlign: 'right', color: '#777777' }}
            zIndex={zIndex}
            zIndexInverse={zIndexInverse}
        />
    );
}