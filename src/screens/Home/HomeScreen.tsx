import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

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
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';


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
            value: formaterNumberToBRL(transaction.value),
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
                            <Ionicons name="stats-chart-outline" size={24} color="black" />
                        </View>
                        <ButtonPlus onPress={() => setShowModalAddTransaction(true)} />
                    </View>
                    <View style={styles.period}>
                        <Ionicons name="chevron-back" size={24} color="black" />
                        <PeriodFilter />
                        <Ionicons name="chevron-forward" size={24} color="black" />
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
            {transactions.length > 0 ? <FlatList<HomeTableItem>
                data={formatItemsToList(transactions)}
                keyExtractor={(item, index) => index.toLocaleString()}
                renderItem={({ item }) => <TransactionItem item={item} />}
            /> : <View>
                <Text style={styles.transactions_infos_h4}>Nenhuma transação nesse período...</Text>
            </View>}
            <ModalAddTransaction isShow={showModalAddTransaction} onClose={() => setShowModalAddTransaction(false)} />
        </View>
    );
}