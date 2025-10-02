import React, { useState } from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CardAccountStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/types/PrincipalStackParamList';
import { useAccountStore } from '../../stores/AccountStore';
import { SelectAccount } from '../SelectAccount/SelectAccount';
import ModalAddAccount from '../modals/ModalAddAccount/ModalAddAccount';


export function CardAccount() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    const {activeAccount} = useAccountStore();

    const [showModalAddAccount, setShowModalAddAccount] = useState(false);

    const handleNavigateToAccountDetails = () => {
        if(activeAccount) {
            navigation.navigate('AccountDetails', {account: activeAccount});
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleNavigateToAccountDetails}>
            <Text style={{fontSize: 14,textAlign: 'center'}}>Conta</Text>
            <View style={styles.card_header}>
                <MaterialIcons name="key" size={28} color="black" style={{flex:1}}/>
                <View style={{alignItems: 'center', flex:4}}>
                    <SelectAccount />
                </View>
                <MaterialIcons name="add" size={28} color="black" style={{flex:1, textAlign: 'right'}} onPress={() => setShowModalAddAccount(true)}/>
            </View>
            <View>
                <Text style={{fontSize: 22}}>Saldo:</Text>
                <View style={styles.card_info}>
                    <Text style={styles.card_info_text_balance}>R${activeAccount?.balance.toFixed(2)}</Text>
                    <MaterialIcons name="visibility" size={24} color="black" />
                </View>
            </View>
            <ModalAddAccount isShow={showModalAddAccount} closeModal={() => setShowModalAddAccount(false)} />
        </TouchableOpacity>
    );
}