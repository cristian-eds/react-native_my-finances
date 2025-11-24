import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './FinanceItemListStyles';
import { DuplicateModel } from '../../domain/duplicateModel';
import { Row } from '../modals/structure/Row/Row';
import { formaterIsoDateToDefaultPattern } from '../../utils/DateFormater';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { findTransactionsByDuplicateId } from '../../services/transactionService'
import { useSQLiteContext } from 'expo-sqlite';
import { Transaction } from '../../domain/transactionModel';
import { ModalFinance } from '../modals/ModalFinance/ModalFinance';
import { useDuplicateStore } from '../../stores/DuplicateStores';

interface FinanceItemList {
    item: DuplicateModel
}

export function FinanceItemList({ item }: FinanceItemList) {

    const [transactionsPayments, setTransactionsPayments] = useState<Transaction[] | undefined>();
    const [showModalFinance, setShowModalFinance] = useState(false);
    const {payments} = useDuplicateStore();

    const valuePaid = transactionsPayments?.reduce((prev, current) => prev += current.value, 0) || 0;
    const isPaid = valuePaid >= item.totalValue;

    useEffect(() => {
        if(payments) {
            setTransactionsPayments(payments.filter(pay => pay.duplicateId === item.id))
        }
    }, [item])

    const renderStatus = () => {
        const { text, bgcolor } = generateStatus();
        return (
            <View style={[styles.status, { backgroundColor: bgcolor }]}>
                <Text style={styles.statusText}>{text}</Text>
            </View>
        )
    }

    const generateStatus = () => {
        let status: { text: string, bgcolor: string } = { text: 'Aberto', bgcolor: '#cacccdd8' };
        if (isPaid) {
            status = { text: 'Pago', bgcolor: '#79bc74ff' }
        } else if (new Date() > new Date(item.dueDate)) {
            status = { text: 'Vencido', bgcolor: '#f19393ff' }
        } else if (transactionsPayments && transactionsPayments.length > 0 && valuePaid < item.totalValue) {
            status = { text: 'Parcialmente Aberto', bgcolor: '#cacccdd8' }
        }

        return status;
    }

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
        <TouchableOpacity style={styles.payButton} disabled={isPaid}>
            <Text style={styles.payButtonText}>PAGAR</Text>
        </TouchableOpacity>
    )

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowModalFinance(true)}>
            <Row>
                <Text style={{ fontSize: 20 }}>{item.description}</Text>
                {renderStatus()}
            </Row>
            <Row>
                <View>
                    <Text style={{ fontSize: 26, fontWeight: '800' }}>{formaterNumberToBRL(item.totalValue)}</Text>
                    <Text style={{ fontSize: 13, fontStyle: 'italic' }}>Já pago: {formaterNumberToBRL(valuePaid)}</Text>
                    <Text style={{ fontSize: 13, fontStyle: 'italic' }}>Saldo: {formaterNumberToBRL(item.totalValue - valuePaid)}</Text>
                </View>
                {renderDueDate()}
            </Row>
            <Row>
                <Text>Duplicata 1/1</Text>
                {!isPaid && renderPayButton()}
            </Row>
            {showModalFinance && <ModalFinance payments={transactionsPayments} isShow={showModalFinance} mode='edit' onClose={() => setShowModalFinance(false)} duplicateData={item} />}
        </TouchableOpacity>
    );
}