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
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { useCategoryStore } from '../../stores/CategoryStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';


export function HomeScreen() {

    const { user } = useUserContext();
    const database = useSQLiteContext();
    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    const { fetchAccounts, activeAccount } = useAccountStore();
    const { fetchTransactions, transactions, filters } = useTransactionStore();
    const { fetchCategories } = useCategoryStore();

    const [showModalTransaction, setShowModalTransaction] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            await fetchCategories(Number(user?.id), database);
            await fetchAccounts(Number(user?.id), database);
        }
        fetch();

    }, [user])

    useEffect(() => {
        if (activeAccount) {
            fetchTransactions(activeAccount.id as number, database);
        }
    }, [activeAccount,filters.initialDate, filters.finalDate])

    const renderCaptionItem = (title: string, movementType: MovementType) => {
        const totalValue = transactions.filter(transaction => transaction.movementType === movementType)
            .map(transaction => transaction.value)
            .reduce((prevValue, current) => prevValue + current, 0);
        return (
            <View style={styles.captionItem}>
                <Text style={styles.captionItemText}>{title}</Text>
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
                            <Ionicons name="stats-chart-outline" size={20} color="black" onPress={() => navigation.navigate('TransactionStatistics')} />
                        </View>
                        <ButtonPlus onPress={() => setShowModalTransaction(true)} />
                    </View>
                    <PeriodFilter />
                    <View style={styles.captions}>
                        {renderCaptionItem('Créditos', MovementType.Receita)}
                        {renderCaptionItem('Débitos', MovementType.Despesa)}
                        {renderCaptionItem('Transfêrencias', MovementType.Transferencia)}
                    </View>
                </View>
            </View>
            {transactions.length > 0 ? <FlatList<HomeTableItem>
                data={toHomeTableItemList(transactions)}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item }) => <TransactionItem item={item} />}
                contentContainerStyle={{ paddingBottom: 80 }}
            /> :
                <View>
                    <Text style={styles.transactions_infos_h4}>Nenhuma transação nesse período...</Text>
                </View>}
            <CircularActionButton onPress={() => setShowModalTransaction(true)} style={{ opacity: 0.8 }} />
            {showModalTransaction && <ModalTransaction isShow={showModalTransaction} onClose={() => setShowModalTransaction(false)} mode='add' activeAccount={activeAccount} />}
        </View>
    );
}