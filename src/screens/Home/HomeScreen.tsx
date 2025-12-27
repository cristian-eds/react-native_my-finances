import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './HomeScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { CardAccount } from '../../components/CardAccount/CardAccount';
import { useSQLiteContext } from 'expo-sqlite';
import { useAccountStore } from '../../stores/AccountStore';
import { ModalTransaction } from '../../components/modals/ModalTransaction/ModalTransaction';
import { useTransactionStore } from '../../stores/TransactionStore';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { TransactionsItemList } from '../../components/TransactionsItemList/TransactionsItemList';
import { useUserContext } from '../../hooks/useUserContext';
import { useParameterStore } from '../../stores/ParameterStore';

export function HomeScreen() {

    const database = useSQLiteContext();
    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
    const {user} = useUserContext();

    const { activeAccount } = useAccountStore();
    const { fetchTransactionsByUser, transactionsUser, filters, setFiltersDates } = useTransactionStore();

    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const [activeMovementType, setActiveMovementType] = useState<MovementType | null>(null);

    useFocusEffect(
        useCallback(() => {     
            const fetch = () => {
                if (activeAccount) {
                    fetchTransactionsByUser(user?.id as number, database, activeAccount.id);
                }   
            }
            fetch();
        }, [activeAccount, filters.initialDate, filters.finalDate])
    );  

    const renderCaptionItem = (title: string, movementType: MovementType) => {
        const totalValue = transactionsUser.filter(transaction => transaction.movementType === movementType)
            .map(transaction => transaction.value)
            .reduce((prevValue, current) => prevValue + current, 0);
        const isActualActive = movementType === activeMovementType;
        return (
            <TouchableOpacity
                style={[styles.captionItem, isActualActive && styles.captionItemActive]}
                onPress={() => setActiveMovementType(prevMovement => prevMovement === movementType ? null : movementType)}>
                <Text style={[styles.captionItemText, isActualActive && styles.captionItemTextActive]}>{title}</Text>
                <Text style={[styles.transactions_infos_h3, isActualActive && styles.captionItemTextActive]}>{formaterNumberToBRL(totalValue)}</Text>
            </TouchableOpacity>
        )
    }

    const filterTransactionActiveMovementType = () => {
        if (!activeMovementType) return transactionsUser;
        const filteredItems = transactionsUser.filter(transaction => transaction.movementType === activeMovementType);
        return filteredItems;
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <CardAccount />
            <View style={styles.transactions}>
                <View style={styles.transactions_infos}>
                    <View style={styles.transactions_infos_item}>
                        <Text style={styles.transactions_infos_h1}>Lançamentos</Text>
                        <Ionicons name="stats-chart-outline" size={20} color="black" onPress={() => navigation.navigate('TransactionStatistics', {data:'transactions' })} />
                    </View>
                    <PeriodFilter filters={filters} setFiltersDates={setFiltersDates}/>
                    <View style={styles.captions}>
                        {renderCaptionItem('Créditos', MovementType.Receita)}
                        {renderCaptionItem('Débitos', MovementType.Despesa)}
                        {renderCaptionItem('Transfêrencias', MovementType.Transferencia)}
                    </View>
                </View>
            </View>
            {transactionsUser.length > 0 && <TransactionsItemList data={filterTransactionActiveMovementType()} />}
            <CircularActionButton onPress={() => setShowModalTransaction(true)} style={{ opacity: 0.8 }} />
            {showModalTransaction && <ModalTransaction isShow={showModalTransaction} onClose={() => setShowModalTransaction(false)} mode='add' />}
        </View>
    );
}