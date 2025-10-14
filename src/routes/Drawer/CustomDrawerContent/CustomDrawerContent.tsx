import React, { useState } from 'react';

import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './CustomDrawerContentStyles';
import { Text, TouchableOpacity, View } from 'react-native';
import { ButtonIconSimple } from '../../../components/buttons/ButtonIconSimple/ButtonIconSimple';
import { useAccountStore } from '../../../stores/AccountStore';
import { useUserContext } from '../../../hooks/useUserContext';

export function CustomDrawerContent({ navigation, ...props }: DrawerContentComponentProps) {

    const [expandAccounts, setExpandAccounts] = useState(false);
    const [expandTransactions, setExpandTransactions] = useState(false);

    const { accounts } = useAccountStore()
    const { logout } = useUserContext();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonIconSimple iconName='arrow-back' onPress={() => navigation.closeDrawer()} />
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Home' } })}>
                        <Ionicons name="wallet-outline" size={24} color="black" />
                        <Text style={styles.itemText}>Contas</Text>
                    </TouchableOpacity>
                    <Ionicons name={expandAccounts ? 'chevron-up' : 'chevron-down'} size={24} color="black" onPress={() => setExpandAccounts(!expandAccounts)} />
                </TouchableOpacity>
                {expandAccounts && accounts &&
                    accounts.map(account => (
                        <TouchableOpacity style={styles.subItem} key={account.id} onPress={() => navigation.navigate('PrincipalStack', { screen: 'AccountDetails' })}>
                            <Ionicons name="wallet-outline" size={22} color="black" />
                            <Text style={styles.subItemText}>{account.name}</Text>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Financas' } })}>
                        <Ionicons name="cash-outline" size={24} color="black" />
                        <Text style={styles.itemText}>Finanças</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Transacoes' } })}>
                        <Ionicons name="swap-horizontal" size={24} color="black" />
                        <Text style={styles.itemText}>Transações</Text>
                    </TouchableOpacity>
                    <Ionicons name={expandTransactions ? 'chevron-up' : 'chevron-down'} size={24} color="black" onPress={() => setExpandTransactions(!expandTransactions)} />
                </TouchableOpacity>
                {
                    expandTransactions && <TouchableOpacity style={styles.subItem} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Categories' })}>
                        <Ionicons name="grid-outline" size={22} color="black" />
                        <Text style={styles.subItemText}>Categorias</Text>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.footer}>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={logout}>
                        <Ionicons name="exit-outline" size={24} color="black" />
                        <Text style={styles.itemText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}