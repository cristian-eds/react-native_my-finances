import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './HomeScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { CardAccount } from '../../components/CardAccount/CardAccount';
import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { useUserContext } from '../../hooks/useUserContext';
import { getAccountsByUser } from '../../services/accountService';
import { useSQLiteContext } from 'expo-sqlite';
import { useAccountStore } from '../../stores/AccountStore';
import { ModalAddTransaction } from '../../components/modals/ModalAddTransaction/ModalAddTransaction';
import { useTransactionStore } from '../../stores/TransactionStore';
import { Transaction } from '../../domain/transactionModel';
import { HomeTableItem } from '../../domain/homeTableItem';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';


export function HomeScreen() {

    const { user } = useUserContext();
    const database = useSQLiteContext();

    const { setActiveAccount, setAccounts, activeAccount } = useAccountStore();
    const { fetchTransactions, transactions } = useTransactionStore();

    const [showModalAddTransaction, setShowModalAddTransaction] = useState(false);

    useEffect(() => {
        const fetchAccount = async () => {
            const accountsUser = await getAccountsByUser(Number(user?.id), database);
            if (accountsUser) {
                setAccounts(accountsUser);
                setActiveAccount(accountsUser[0])

            };
        }
        fetchAccount();

    }, [user])

    useEffect(() => {
        if (activeAccount) {
            fetchTransactions(activeAccount.id as number, database);
        }
    }, [activeAccount])

    const formatItemsToList = (transactions: Transaction[]): HomeTableItem[] => {
        return transactions.map((transaction) => ({
            data: transaction.paymentDate.toLocaleDateString(),
            description: transaction.description,
            categoria: "Lazer",
            value: new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(transaction.value),
            movementType: transaction.movementType ?? MovementType.Despesa
        }));
    };

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <CardAccount />
            <View style={styles.transactions}>
                <View style={styles.transactions_infos}>
                    <View style={styles.transactions_infos_item}>
                        <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                            <Text style={styles.transactions_infos_h1}>Lançamentos</Text>
                            <MaterialIcons name="leaderboard" size={24} color="black" />
                        </View>
                        <ButtonPlus onPress={() => setShowModalAddTransaction(true)} />
                    </View>
                    <View style={styles.transactions_infos_item}>
                        <Text style={styles.transactions_infos_h2}>Período</Text>
                        <Text style={styles.transactions_infos_h2}>Set-2025</Text>
                    </View>
                    <View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Créditos</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Débitos</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Transferência</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                    </View>
                </View>
            </View>
            <FlatList<HomeTableItem>
                data={formatItemsToList(transactions)}
                keyExtractor={(item, index) => index.toLocaleString()}
                renderItem={({ item }) => <TransactionItem item={item}/>}
            />
            <ModalAddTransaction isShow={showModalAddTransaction} onClose={() => setShowModalAddTransaction(false)} />
        </View>
    );
}