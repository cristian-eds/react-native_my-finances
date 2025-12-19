import React, { useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useAccountStore } from '../../stores/AccountStore';

import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './SelectAccountStyles';
import { mapAccountsToItemsDropdown } from '../../utils/mappers/itemsPickerMapper';
import { Status } from '../../domain/enums/statusEnum';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';

interface SelectAccountProps {
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}

export function SelectAccount({ containerStyle, labelStyle }: SelectAccountProps) {

    const [open, setOpen] = useState(false);
    const { accounts, activeAccount, setActiveAccount } = useAccountStore();

    const itemsToDropDown = [...mapAccountsToItemsDropdown(accounts), {label: 'Geral', value: '0'}]

    const handleSetNewAccount = (accountId: number) => {
        if(accountId == 0) {
            setActiveAccount({
                status: Status.Ativo,
                accountNumber: '9999',
                agency:'9999',
                balance: accounts.reduce((prev, current) => current.balance + prev, 0),
                bankCode: '999',
                creationDate: new Date().toISOString(),
                holderName: 'ADMIN',
                id: 0,
                name: 'Geral',
                type: TypeAccount.Corrente
            })
            return;
        }
        const newActiveAccount = accounts.find(acc => acc.id === Number(accountId));
        if (newActiveAccount) {
            setActiveAccount(newActiveAccount);
        } 
    }

    return (
        <DropDownPicker
            value={activeAccount?.id.toLocaleString() ?? ''}
            open={open}
            setOpen={setOpen}
            setValue={(callback) => {
                const newValue = callback(activeAccount?.id);
                handleSetNewAccount(newValue);
            }}
            items={itemsToDropDown}

            containerStyle={[styles.container_dropdown, containerStyle]}
            style={styles.dropdown}
            textStyle={styles.dropdown_text}
            labelStyle={[styles.dropdown_label, labelStyle]}
            dropDownContainerStyle={styles.dropDownContainerStyle}

            listItemContainerStyle={{borderBottomColor: '#ccc', borderBottomWidth: 1}}
            
            placeholder='Selecione uma conta'
            maxHeight={200}
            listMode='SCROLLVIEW'
            zIndex={30000}
            zIndexInverse={10000}
        />

    );
}