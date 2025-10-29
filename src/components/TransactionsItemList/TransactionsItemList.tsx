import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './TransactionItemListStyles';
import { TransactionItem } from '../TransactionItem/TransactionItem';
import { TransactionItemData } from '../../domain/transactionItemData';

interface TransactionsItemListProps {
    data: TransactionItemData[];
}

export function TransactionsItemList({ data }: TransactionsItemListProps) {
    return (
        <>
            {data.length > 0 ?
                <FlatList<TransactionItemData >
                    data={data}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({ item }) => <TransactionItem item={item} />}
                    contentContainerStyle={{ paddingBottom: 80 }}
                /> :
                <View>
                    <Text style={styles.textNoTransactions}>Nenhuma transação nesse período...</Text>
                </View>}
        </>
    );
}