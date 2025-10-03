import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from './TableStyles';
import { HomeTableItem } from '../../domain/homeTableItem';

interface TableProps {
    flexArray: number[],
    items: HomeTableItem[],
    titles: string[]
}

export function Table(props: TableProps) {

    const flexArray = [3, 2, 2, 2];

    const renderItem = (item: typeof props.items[number]) => {
        return (
            <View style={styles.table_row}>
                {Object.values(item).map((value, index) => (
                    <View key={index} style={[styles.table_row_cell, { flex: flexArray[index] }]}>
                        <Text
                            style={[styles.table_row_cell_text, index === 0 && 
                            { textAlign: 'left' }, 
                            index === Object.values(item).length - 1 && { textAlign: 'right' }]}>{value}</Text>
                    </View>
                ))}
            </View>
        )
    }

    const renderHeader = (item: string[]) => {
        return (
            <View style={styles.table_row_header}>
                {item.map((text, index) => (
                    <View key={index} style={[styles.table_row_cell, { flex: flexArray[index] }]}>
                        <Text style={[styles.table_row_cell_text, index === 0 && { textAlign: 'left' }, index == item.length - 1 && { textAlign: 'right' }]}>{text}</Text>
                    </View>
                ))}
            </View>
        )
    }


    return (
        <View style={styles.table}>
            {renderHeader(props.titles)}
            <FlatList<HomeTableItem>
                data={props.items}
                keyExtractor={(item, index) => index.toLocaleString()}
                renderItem={({ item }) => renderItem(item)}

            />
        </View>
    );
}