import React, { useState } from 'react';

import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './CustomDrawerContentStyles';
import { Text, TouchableOpacity, View } from 'react-native';
import { ButtonIconSimple } from '../../../components/buttons/ButtonIconSimple/ButtonIconSimple';
import { useAccountStore } from '../../../stores/AccountStore';

export function CustomDrawerContent({ navigation, ...props }: DrawerContentComponentProps) {

    const [expandAccounts, setExpandAccounts] = useState(false);

    const { accounts } = useAccountStore()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonIconSimple iconName='arrow-back' onPress={() => navigation.closeDrawer()} />
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', {screen: 'Main', params: { screen: 'Home'} })}>
                        <Ionicons name="wallet-outline" size={24} color="black" />
                        <Text style={styles.itemText}>Contas</Text>
                    </TouchableOpacity>
                    <Ionicons name={expandAccounts ? 'chevron-up' : 'chevron-down'} size={24} color="black" onPress={() => setExpandAccounts(!expandAccounts)} />
                </TouchableOpacity>
                {expandAccounts && accounts &&
                    accounts.map(account => (
                        <TouchableOpacity style={styles.subItem} key={account.id} onPress={() => navigation.navigate('PrincipalStack', {screen: 'AccountDetails'})}>
                            <Ionicons name="wallet-outline" size={22} color="black" />
                            <Text  style={styles.subItemText}>{account.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>

    );
}