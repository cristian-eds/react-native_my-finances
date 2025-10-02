import React, { useState } from 'react';

import { styles } from './SelectAccountStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAccountStore } from '../../stores/AccountStore';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface SelectAccountProps {
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

export function SelectAccount({ containerStyle, labelStyle }: SelectAccountProps) {

    const [open, setOpen] = useState(false);
    const { accounts, activeAccount, setActiveAccount } = useAccountStore();

    const itemsToDropDown = accounts.map((account) => { return { label: account.name, value: account.id } })

    const handleSetNewAccount = (accountId: number) => {
        const newActiveAccount = accounts.find(acc => acc.id === accountId);
        if (newActiveAccount) {
            setActiveAccount(newActiveAccount);
        }
    }

    return (
        <DropDownPicker
            value={activeAccount?.id as number}
            open={open}
            setOpen={setOpen}
            setValue={(callback) => {
                const newValue = callback(activeAccount?.id as number);
                handleSetNewAccount(newValue);
            }}
            items={itemsToDropDown}

            containerStyle={[styles.container_dropdown, containerStyle]}
            style={styles.dropdown}
            textStyle={styles.dropdown_text}
            labelStyle={[styles.dropdown_label, labelStyle]}
            dropDownContainerStyle={styles.dropDownContainerStyle}

            listItemContainerStyle={{borderBottomColor: '#ccc', borderBottomWidth: 1}}
            
            placeholder='Selecione um item'
            maxHeight={200}
            listMode='SCROLLVIEW'
        />

    );
}