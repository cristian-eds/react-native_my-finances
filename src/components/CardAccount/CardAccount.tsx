import React from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './CardAccountStyles';
import { Account } from '../../domain/accountModel';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/types/PrincipalStackParamList';

interface CardAccountProps {
    account: Account | null
}

export function CardAccount({account}: CardAccountProps) {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    const handleNavigateToAccountDetails = () => {
        if(account) {
            navigation.navigate('AccountDetails', {account: account});
        }
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleNavigateToAccountDetails}>
            <View style={styles.card_header}>
                <MaterialIcons name="key" size={28} color="black" />
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>Conta</Text>
                    <View style={styles.card_header_account}>
                        <Text style={styles.card_header_account_title}>{account?.name}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </View>
                </View>
                <MaterialIcons name="add" size={28} color="black" />
            </View>
            <View>
                <Text style={{fontSize: 22}}>Saldo:</Text>
                <View style={styles.card_info}>
                    <Text style={styles.card_info_text_balance}>R${account?.balance.toFixed(2)}</Text>
                    <MaterialIcons name="visibility" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    );
}