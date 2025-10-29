import React, { useEffect } from 'react';
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
import { toTransactionItemData } from '../../mappers/transactionMapper';
import { useSQLiteContext } from 'expo-sqlite';

export function TransactionsScreen() {

  const { transactions, fetchTransactions } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();

  const database = useSQLiteContext();

  const mapTransactions = () => {
    const items = transactions.map<TransactionItemData>(transaction => {
      const category = categories.find(cat => cat.id === transaction.categoryId);
      const account = accounts.find(acc => acc.id === transaction.accountId);
      const destinationAccount = accounts.find(acc => acc.id === transaction.destinationAccountId);
      return toTransactionItemData(transaction, account!, category!, destinationAccount!);
    });
    return items;
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchTransactions(0, database);
    }
    fetch();
  }, []);

  return (
    <View style={[GlobalStyles.container_screens_normal, { paddingTop: 18 }]}>
      <SearchInput placeholder="Search Transactions" />
      <Row style={{ paddingHorizontal: 5 }}>
        <Row>
          <Text style={{ fontSize: 22 }}>Filtros</Text>
          <Ionicons name="filter" size={20} color="black" />
        </Row>
        <Text style={{ fontSize: 22 }}>Limpar Filtros</Text>
      </Row>
      <PeriodFilter />
      <View>
        <TransactionsItemList data={mapTransactions()} />
      </View>
      <CircularActionButton />
    </View>
  );
}