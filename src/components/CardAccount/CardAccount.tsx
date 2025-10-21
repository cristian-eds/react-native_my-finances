import React, { useState } from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CardAccountStyles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAccountStore } from '../../stores/AccountStore';
import { SelectAccount } from '../SelectAccount/SelectAccount';
import ModalAccount from '../modals/ModalAccount/ModalAccount';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';


export function CardAccount() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    const { activeAccount } = useAccountStore();

    const [showModalAddAccount, setShowModalAddAccount] = useState(false);

    const handleNavigateToAccountDetails = () => {
        if (activeAccount) {
            navigation.navigate('AccountDetails', { account: activeAccount });
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleNavigateToAccountDetails}>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>Conta</Text>
            <View style={styles.card_header}>
                <Ionicons name="key-outline" size={24} color="black" style={{ flex: 1 }} />
                <View style={{ alignItems: 'center', flex: 4 }}>
                    <SelectAccount />
                </View>
                <Ionicons name="add" size={25} color="black" style={{ flex: 1, textAlign: 'right' }} onPress={() => setShowModalAddAccount(true)} />
            </View>
            <View>
                <Text style={{ fontSize: 22 }}>Saldo:</Text>
                <View style={styles.card_info}>
                    <Text style={styles.card_info_text_balance}>{formaterNumberToBRL(activeAccount?.balance)}</Text>
                    <Ionicons name="eye-outline" size={24} color="black" />
                </View>
            </View>
            <ModalAccount isShow={showModalAddAccount} onClose={() => setShowModalAddAccount(false)} />
        </TouchableOpacity>
    );
}