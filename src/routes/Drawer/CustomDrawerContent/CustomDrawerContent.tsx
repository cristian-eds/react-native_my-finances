import React, { useState } from 'react';

import { DrawerContentComponentProps } from '@react-navigation/drawer';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './CustomDrawerContentStyles';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAccountStore } from '../../../stores/AccountStore';
import { useUserContext } from '../../../hooks/useUserContext';
import { ButtonBack } from '../../../components/buttons/ButtonBack/ButtonBack';
import { Account } from '../../../domain/accountModel';

export function CustomDrawerContent({ navigation, ...props }: DrawerContentComponentProps) {

    const [expandAccounts, setExpandAccounts] = useState(false);
    const [expandTransactions, setExpandTransactions] = useState(false);

    const { accounts,setActiveAccount } = useAccountStore()
    const { logout } = useUserContext();

    const handleNavigateToAccountDetails = (account: Account) => {
        setActiveAccount(account);
        navigation.navigate('PrincipalStack', { screen: 'AccountDetails' });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ButtonBack onPress={() => navigation.closeDrawer()} />
            </View>
            <View style={styles.tab}>
                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Home' } })}>
                        <Ionicons name="wallet-outline" size={22} color="black" />
                        <Text style={styles.itemText}>Contas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxChevron} onPress={() => setExpandAccounts(!expandAccounts)}>
                        <Ionicons name={expandAccounts ? 'chevron-up' : 'chevron-down'} size={22} color="black" />
                    </TouchableOpacity>
                </TouchableOpacity>
                {expandAccounts && accounts &&
                    accounts.map(account => (
                        <TouchableOpacity style={styles.subItem} key={account.id} onPress={() => handleNavigateToAccountDetails(account)}>
                            <Ionicons name="wallet-outline" size={20} color="black" />
                            <Text style={styles.subItemText}>{account.name}</Text>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Financas' } })}>
                        <Ionicons name="cash-outline" size={22} color="black" />
                        <Text style={styles.itemText}>Finanças</Text>
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Main', params: { screen: 'Transacoes' } })}>
                        <Ionicons name="swap-horizontal" size={22} color="black" />
                        <Text style={styles.itemText}>Transações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxChevron} onPress={() => setExpandTransactions(!expandTransactions)}>
                        <Ionicons name={expandTransactions ? 'chevron-up' : 'chevron-down'} size={22} color="black" />
                    </TouchableOpacity>
                </TouchableOpacity>
                {
                    expandTransactions && <TouchableOpacity style={styles.subItem} onPress={() => navigation.navigate('PrincipalStack', { screen: 'Categories' })}>
                        <Ionicons name="grid-outline" size={20} color="black" />
                        <Text style={styles.subItemText}>Categorias</Text>
                    </TouchableOpacity>
                }
            </View>
            <View>
                <View style={styles.item}>
                    <TouchableOpacity style={styles.itemLink} onPress={logout}>
                        <Ionicons name="exit-outline" size={22} color="black" />
                        <Text style={styles.itemText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
}