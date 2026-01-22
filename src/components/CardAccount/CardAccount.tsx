import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSQLiteContext } from 'expo-sqlite';

import Ionicons from '@expo/vector-icons/Ionicons';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CardAccountStyles';

import { useAccountStore } from '../../stores/AccountStore';

import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { useParameterStore } from '../../stores/ParameterStore';

import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';

import { SelectAccount } from '../SelectAccount/SelectAccount';
import ModalAccount from '../modals/ModalAccount/ModalAccount';


export function CardAccount() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
    const database = useSQLiteContext();

    const { activeAccount } = useAccountStore();
    const { parameters, updateParameters } = useParameterStore();

    const [showModalAddAccount, setShowModalAddAccount] = useState(false);

    const handleNavigateToAccountDetails = () => {
        if (activeAccount) {
            navigation.navigate('AccountDetails', { account: activeAccount });
        }
    }

    const handleShowBalance = async () => {
        const updatedParameters = {
            ...parameters,
            enableShowBalance: !parameters.enableShowBalance
        };
        await updateParameters(updatedParameters, database);
    }

    const renderBalanceValue = () => {
        const value = formaterNumberToBRL(activeAccount?.balance);
        if (parameters?.enableShowBalance) return value;
        return 'R$ ••••••••';
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleNavigateToAccountDetails}>
            <View style={styles.card_header}>
                <View style={{ flex: 3 }}>
                    <SelectAccount labelStyle={{ fontSize: 35, textAlign: 'left' }} />
                </View>
                <Ionicons name="add" size={25} color="black" style={{ flex: 1, textAlign: 'right' }} onPress={() => setShowModalAddAccount(true)} />
            </View>
            <View>
                <Text style={styles.cardText}>Saldo Disponível:</Text>
                <View style={styles.card_info}>
                    <Text style={styles.card_info_text_balance}>{renderBalanceValue()}</Text>
                    <Ionicons name={parameters?.enableShowBalance ? "eye-outline" : "eye-off-outline"} size={24} color="black" onPress={handleShowBalance} />
                </View>
            </View>
            <ModalAccount isShow={showModalAddAccount} onClose={() => setShowModalAddAccount(false)} />
        </TouchableOpacity>
    );
}