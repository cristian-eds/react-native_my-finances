import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './TableStyles';
import { SectionList } from 'react-native';

const data = [
    { id: 1, data: '11/09/2025', description: 'Caixa', category: "Lazer", value: 200.00 },
    { id: 2, data: '11/09/2025', description: 'Caixa', category: "Lazer", value: 200.00 },
    { id: 3, data: '11/09/2025', description: 'Caixa', category: "Lazer", value: 200.00 },
];

interface Item {
    id: Number,
    data: string,
    description: string,
    category: string,
    value: Number
}

export function Table() {

    const renderItem = (item: Item) => {
        return (
            <View style={styles.table_row}>
                {Object.entries(item).map(([key, value]) => (
                    <View style={[styles.table_row_item, key !== 'id' ? { flex: 2 } : { flex: 1 }]}>
                        <Text style={styles.table_row_item_text}>{value}</Text>
                    </View>
                ))}
            </View>
        )
    }

    const renderHeader = (item: string[]) => {
        return (
            <View style={styles.table_row}>
                {item.map(item => (
                    <View style={[styles.table_row_item, item !== 'Id' ? { flex: 2 } : { flex: 1 }]}>
                        <Text>{item}</Text>
                    </View>
                ))}
            </View>
        )
    }


    return (
        <View style={styles.table}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toLocaleString()}
                renderItem={({ item }) => renderItem(item)}
               
            />
        </View>
    );
}