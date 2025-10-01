import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './SelectAccountStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import { useAccountStore } from '../../stores/AccountStore';


export function SelectAccount() {

    const [open, setOpen] = useState(false);
    const {accounts, activeAccount, setActiveAccount} = useAccountStore();

    const itemsToDropDown = accounts.map((account) => { return { label: account.name, value: account.id } })

    const handleSetNewAccount = (accountId: number) => {
        const newActiveAccount = accounts.find(acc => acc.id === accountId);
        if(newActiveAccount) {
            setActiveAccount(newActiveAccount);
        }   
    }

    return (
        <View style={styles.container}>
            <DropDownPicker
                value={activeAccount?.id as number}
                open={open}
                setOpen={setOpen}
                setValue={(callback) => {
                    const newValue = callback(activeAccount?.id as number);
                    handleSetNewAccount(newValue);
                }}
                items={itemsToDropDown}
                containerStyle={styles.container_dropdown}
                placeholder='Selecione um item'
                maxHeight={200}
                listMode='SCROLLVIEW'

            />
        </View>
    );
}