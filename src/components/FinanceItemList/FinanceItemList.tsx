import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './FinanceItemListStyles';
import { DuplicateModel } from '../../domain/duplicateModel';
import { Row } from '../modals/structure/Row/Row';
import { formaterIsoDateToDefaultPattern } from '../../utils/DateFormater';
import { formaterNumberToBRL } from '../../utils/NumberFormater';

interface FinanceItemList {
    item: DuplicateModel
}

export function FinanceItemList({ item }: FinanceItemList) {

    const renderStatus = () => (
        <View style={styles.status}>
            <Text style={styles.statusText}>ABERTO</Text>
        </View>
    )

    const renderDueDate = () => (
        <Row>
            <Ionicons name="calendar-outline" size={20} color="black" />
            <View>
                <Text>Vencimento</Text>
                <Text>{formaterIsoDateToDefaultPattern(new Date(item.dueDate))}</Text>
            </View>
        </Row>
    )

    const renderPayButton = () => (
        <View style={styles.payButton}>
            <Text style={styles.payButtonText}>PAGAR</Text>
        </View>
    )


    return (
        <TouchableOpacity style={styles.container}>
            <Row>
                <Text style={{ fontSize: 20 }}>{item.description}</Text>
                {renderStatus()}
            </Row>
            <Row>
                <Text style={{ fontSize: 26, fontWeight: '800' }}>{formaterNumberToBRL(item.totalValue)}</Text>
                {renderDueDate()}
            </Row>
            <Row>
                <Text>Duplicata 1/1</Text>
                {renderPayButton()}
            </Row>
        </TouchableOpacity>
    );
}