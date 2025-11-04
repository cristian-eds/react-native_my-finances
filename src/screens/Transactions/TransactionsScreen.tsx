import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './TransactionsScreenStyles';

import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Row } from '../../components/modals/structure/Row/Row';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { CircularActionButton } from '../../components/buttons/CircularActionButton/CircularActionButton';
import { useTransactionStore } from '../../stores/TransactionStore';
import { TransactionsItemList } from '../../components/TransactionsItemList/TransactionsItemList';
import { useCategoryStore } from '../../stores/CategoryStore';
import { useAccountStore } from '../../stores/AccountStore';
import { TransactionItemData } from '../../domain/transactionItemData';
import { toTransactionItemData } from '../../utils/mappers/transactionMapper';
import { useSQLiteContext } from 'expo-sqlite';
import { useFocusEffect } from '@react-navigation/native';
import { useUserContext } from '../../hooks/useUserContext';
import { ModalTransaction } from '../../components/modals/ModalTransaction/ModalTransaction';
import { TouchableOpacity } from 'react-native';
import { ModalFiltersTransaction } from '../../components/modals/ModalFiltersTransaction/ModalFiltersTransaction';

export function TransactionsScreen() {

  const { transactionsUser, fetchTransactionsByUser, filters, setFilterText, cleanFilters } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();
  const { user } = useUserContext();

  const database = useSQLiteContext();

  const [showModalTransaction, setShowModalTransaction] = useState(false);
  const [showModalFilters, setShowModalFilters] = useState(false);

  const mapTransactions = () => {
    const items = transactionsUser.map<TransactionItemData>(transaction => {
      const category = categories.find(cat => cat.id === transaction.categoryId);
      const account = accounts.find(acc => acc.id === transaction.accountId);
      const destinationAccount = accounts.find(acc => acc.id === transaction.destinationAccountId);
      return toTransactionItemData(transaction, account!, category!, destinationAccount!);
    });
    return items;
  }

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        fetchTransactionsByUser(user?.id as number, database);
      }
      fetch();
    }, [filters]
    )
  );

  const renderCleanFilters = () => {
    if (!filters.accounts && !filters.categories && !filters.movementType) return;
    if (filters.accounts?.length === 0 && filters.categories?.length === 0 && filters.movementType?.length === 0) return;
    return (
      <TouchableOpacity onPress={cleanFilters} style={{ marginLeft: 8, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
        <Ionicons name="close" size={14} color="red" />
        <Text style={{ fontSize: 14, color: 'red' }}>Limpar filtros</Text>

      </TouchableOpacity>
    )

  }

  return (
    <View style={[GlobalStyles.container_screens_normal, { paddingTop: 18 }]}>
      <SearchInput placeholder="Search Transactions" value={filters.textSearch} onChangeText={setFilterText} />
      <Row style={{ paddingHorizontal: 5 }}>
        <TouchableOpacity onPress={() => setShowModalFilters(true)} style={{ alignItems: 'center', gap: 4 }}>
          <Row>
            <Ionicons name="filter" size={20} color="black" />
            <Text style={{ fontSize: 22 }}>Filtros</Text>
            {renderCleanFilters()}
          </Row>
        </TouchableOpacity>
        <Ionicons name="stats-chart-outline" size={20} color="black" />
      </Row>
      <PeriodFilter />
      <TransactionsItemList data={mapTransactions()} />
      <CircularActionButton onPress={() => setShowModalTransaction(true)} style={{ opacity: 0.8 }} />
      <ModalTransaction isShow={showModalTransaction} mode='add' onClose={() => setShowModalTransaction(false)} />
      {showModalFilters && <ModalFiltersTransaction isShow={showModalFilters} onClose={() => setShowModalFilters(false)} />}
    </View>
  );
}