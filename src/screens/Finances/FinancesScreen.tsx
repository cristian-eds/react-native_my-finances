import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './FinancesScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Row } from '../../components/modals/structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { ModalFinance } from '../../components/modals/ModalFinance/ModalFinance';
import { useDuplicateStore } from '../../stores/DuplicateStores';
import { useUserContext } from '../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';
import { DuplicateModel } from '../../domain/duplicateModel';
import { FinanceItemList } from '../../components/FinanceItemList/FinanceItemList';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { findTransactionsByDuplicateList } from '../../services/transactionService';
import { useTransactionStore } from '../../stores/TransactionStore';

export function FinancesScreen() {

    const [textSearch, setTextSearch] = useState("");
    const [showModalFilters, setShowModalFilters] = useState(false);
    const [showModalFinance, setShowModalFinance] = useState(false);
    const [typeFinances, setTypeFinances] = useState<'PAYABLE'|'RECEIVABLE'>('PAYABLE');

    const {duplicates,fetchDuplicates, setPayments} = useDuplicateStore();
    const {transactionsUser} = useTransactionStore();
    const {user} = useUserContext();
    const database = useSQLiteContext();

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    useFocusEffect(
        useCallback(() => {
            const fetch = async () => {
                fetchDuplicates(user?.id as number, database)
                if(duplicates) {
                    const payments = await findTransactionsByDuplicateList(duplicates, database);
                    setPayments(payments)
                }
            }
            fetch();
        },[transactionsUser])
    )

    const renderCleanFilters = () => {
        return (
            <TouchableOpacity style={{ marginLeft: 8, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Ionicons name="close" size={14} color="red" />
                <Text style={{ fontSize: 14, color: 'red' }}>Limpar filtros</Text>
            </TouchableOpacity>
        )
    }

    const renderTypeCaption = (text: string, type: 'PAYABLE'|'RECEIVABLE') => {
        const isActive = type === typeFinances;
        return (
            <TouchableOpacity onPress={() => setTypeFinances(type)} style={[styles.captionItem, isActive ? styles.captionItemActive : '']}>
                <Text style={[styles.captionItemText, isActive ? styles.captionItemTextActive : '']}>{text}</Text>
            </TouchableOpacity>
        )
    }

    const renderItems = () => {
        const actualType = typeFinances === 'PAYABLE' ? MovementType.Despesa : MovementType.Receita;
        const filteredItems = duplicates.filter((duplicate) => duplicate.movementType === actualType)
        return (
            <FlatList<DuplicateModel>
                data={filteredItems}
                renderItem={({item})  => <FinanceItemList item={item} />}
                keyExtractor={(item) => item.id?.toLocaleString()}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        )
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <SearchInput placeholder="Pesquisar..." value={textSearch} onChangeText={setTextSearch} />
            <Row style={{ paddingHorizontal: 5 }}>
                <TouchableOpacity onPress={() => setShowModalFilters(true)} style={{ alignItems: 'center', gap: 4 }}>
                    <Row>
                        <Ionicons name="filter" size={20} color="black" />
                        <Text style={{ fontSize: 22 }}>Filtros</Text>
                        {renderCleanFilters()}
                    </Row>
                </TouchableOpacity>
                <Ionicons name="stats-chart-outline" size={20} color="black" onPress={() => navigation.navigate('TransactionStatistics', { data: 'userTransactions' })} />
            </Row>
            <PeriodFilter />

            <Row>
                {renderTypeCaption('Contas À Pagar', 'PAYABLE')}
                {renderTypeCaption('Contas À Receber', 'RECEIVABLE')}
            </Row>
            {renderItems()}
        
            <CircularActionButton onPress={() => setShowModalFinance(true)}/>
            {showModalFinance && <ModalFinance isShow={showModalFinance} mode='add' onClose={() => setShowModalFinance(false)} /> }
        </View>
    );
}