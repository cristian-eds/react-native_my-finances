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

interface FinanceItemList {
    item: DuplicateModel
}

export function FinanceItemList({ item }: FinanceItemList) {

    const datababase = useSQLiteContext();
    const [transactionsPayments, setTransactionsPayments] = useState<Transaction[] | undefined>();
    const [showModalFinance, setShowModalFinance] = useState(false);

    useEffect(() => {
        const fetchPayments = async () => {
            const transactions = await findTransactionsByDuplicateId(item.id.toLocaleString(), datababase);
            setTransactionsPayments(transactions);
        }

        fetchPayments();
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
        if (transactionsPayments && transactionsPayments.reduce((prev, current) => prev += current.value, 0) >= item.totalValue) {
            status = { text: 'Pago', bgcolor: '#79bc74ff' }
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
        <TouchableOpacity style={styles.payButton}>
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
                <Text style={{ fontSize: 26, fontWeight: '800' }}>{formaterNumberToBRL(item.totalValue)}</Text>
                {renderDueDate()}
            </Row>
            <Row>
                <Text>Duplicata 1/1</Text>
                {renderPayButton()}
            </Row>
            {showModalFinance && <ModalFinance payments={transactionsPayments} isShow={showModalFinance} mode='edit' onClose={()=> setShowModalFinance(false)} duplicateData={item}/>}
        </TouchableOpacity>
    );
}