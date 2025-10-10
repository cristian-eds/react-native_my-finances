import React, { useEffect, useState } from 'react';
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
import { ModalTransaction } from '../../components/modals/ModalTransaction/ModalTransaction';
import { useTransactionStore } from '../../stores/TransactionStore';
import { HomeTableItem } from '../../domain/homeTableItem';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { TransactionItem } from '../../components/TransactionItem/TransactionItem';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { toHomeTableItemList } from '../../mappers/transactionMapper';


export function HomeScreen() {

    const { user } = useUserContext();
    const database = useSQLiteContext();

    const { setActiveAccount, setAccounts, activeAccount } = useAccountStore();
    const { fetchTransactions, transactions, filters } = useTransactionStore();

    const [showModalTransaction, setShowModalTransaction] = useState(false);

    useEffect(() => {
        const fetchAccount = async () => {
            const accountsUser = await getAccountsByUser(Number(user?.id), database);
            if (accountsUser) {
                setAccounts(accountsUser);
                setActiveAccount(accountsUser[0])
            };
        }
        fetchAccount();

    }, [user, filters.initialDate, filters.finalDate])

    useEffect(() => {
        if (activeAccount) {
            fetchTransactions(activeAccount.id as number, database);
        }
    }, [activeAccount])

    const renderCaptionItem = (title: string, movementType: MovementType) => {
        const totalValue = transactions.filter(transaction => transaction.movementType === movementType)
                    .map(transaction => transaction.value)
                    .reduce((prevValue, current) => prevValue + current,0);
        return (
            <View style={styles.transactions_infos_item}>
                <Text style={styles.transactions_infos_h3}>{title}</Text>
                <Text style={styles.transactions_infos_h3}>{formaterNumberToBRL(totalValue)}</Text>
            </View>
        )
    }

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
                        <ButtonPlus onPress={() => setShowModalTransaction(true)} />
                    </View>
                    <View style={styles.period}>
                        <PeriodFilter />
                    </View>
                    <View>
                        {renderCaptionItem('Créditos', MovementType.Receita)}
                        {renderCaptionItem('Débitos', MovementType.Despesa)}
                        {renderCaptionItem('Transfêrencia', MovementType.Transferencia)}
                    </View>
                </View>
            </View>
            {transactions.length > 0 ? <FlatList<HomeTableItem>
                data={toHomeTableItemList(transactions)}
                keyExtractor={(item, index) => index.toLocaleString()}
                renderItem={({ item }) => <TransactionItem item={item} />}
            /> : <View>
                <Text style={styles.transactions_infos_h4}>Nenhuma transação nesse período...</Text>
            </View>}
            <ModalTransaction isShow={showModalTransaction} onClose={() => setShowModalTransaction(false)} mode='add'/>
        </View>
    );
}