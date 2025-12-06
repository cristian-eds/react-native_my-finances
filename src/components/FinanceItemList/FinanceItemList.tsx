import React, { use, useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './FinanceItemListStyles';
import { DuplicateModel } from '../../domain/duplicateModel';
import { Row } from '../structure/Row/Row';
import { formaterIsoDateToDefaultPattern } from '../../utils/DateFormater';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { Transaction } from '../../domain/transactionModel';
import { ModalFinance } from '../modals/ModalFinance/ModalFinance';
import { useDuplicateStore } from '../../stores/DuplicateStores';
import { ModalTransaction } from '../modals/ModalTransaction/ModalTransaction';
import { DuplicateStatus } from '../../domain/enums/duplicateStatusEnun';
import { formaterEnumKeyToLabel } from '../../utils/StringFormater';
import { getByFatherId } from '../../services/duplicateService';
import { useUserContext } from '../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';

interface FinanceItemList {
    item: DuplicateModel,
}

export function FinanceItemList({ item }: FinanceItemList) {

    const [showModalFinance, setShowModalFinance] = useState(false);
    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const [recurrenceDuplicates, setRecurrenceDuplicates] = useState<DuplicateModel[]>([]);

    const { payments, filters } = useDuplicateStore();
    const { user } = useUserContext();
    const database = useSQLiteContext();

    const transactionsPayments = payments.filter(pay => pay.duplicateId === item.id);

    const valuePaid = transactionsPayments?.reduce((prev, current) => prev += current.value, 0) || 0;
    const isPaid = valuePaid >= item.totalValue;

    useEffect(() => {
        const fetchRecurrenceDuplicates = async () => {
            if (item.duplicateFatherId) {
                const duplicates = await getByFatherId(item.duplicateFatherId,user?.id as number,database);
                setRecurrenceDuplicates(duplicates);
            }
        }
        fetchRecurrenceDuplicates();
    }, [item.duplicateFatherId]);

    const renderStatus = () => {
        const { text, bgcolor } = generateStatus();
        return (
            <View style={[styles.status, { backgroundColor: bgcolor }]}>
                <Text style={styles.statusText}>{formaterEnumKeyToLabel(text)}</Text>
            </View>
        )
    }

    const generateStatus = () => {
        let status: { text: DuplicateStatus, bgcolor: string } = { text: DuplicateStatus.Aberto, bgcolor: '#cacccdd8' };
        if (isPaid) {
            status = { text: DuplicateStatus.Paga, bgcolor: '#79bc74ff' }
        } else if (new Date() > new Date(item.dueDate)) {
            status = { text: DuplicateStatus.Vencido, bgcolor: '#f19393ff' }
        } else if (transactionsPayments && transactionsPayments.length > 0 && valuePaid < item.totalValue) {
            status = { text: DuplicateStatus.Parcialmente_Paga, bgcolor: '#cacccdd8' }
        }
        return status;
    }

    const dataToPayment = (): Transaction => {
        const remainingValue = transactionsPayments && transactionsPayments?.length > 0 ? item.totalValue - transactionsPayments.reduce((prev, current) => prev += current.value, 0) : Number(item.totalValue);
        return {
            id: 0,
            accountId: Number(item.accountId) ?? 0,
            description: `Pago: ${item.description}`,
            movementType: item.movementType,
            paymentDate: new Date(),
            value: remainingValue,
            categoryId: Number(item.categoryId) ?? null,
            duplicateId: item?.id,
        }
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
        <TouchableOpacity style={styles.payButton} disabled={isPaid} onPress={() => setShowModalTransaction(true)}>
            <Text style={styles.payButtonText}>PAGAR</Text>
        </TouchableOpacity>
    )

    return (
        <>
            {filters.status && filters.status.length > 0 && !filters.status.includes(generateStatus().text) ? null :
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
                        <Text>Duplicata {`${item.numberInstallments}/${recurrenceDuplicates.length}`}</Text>
                        {!isPaid && renderPayButton()}
                    </Row>
                    {showModalTransaction && <ModalTransaction isShow={showModalTransaction} mode='payment' onClose={() => setShowModalTransaction(false)} transactionData={dataToPayment()} />}
                    {showModalFinance && <ModalFinance isShow={showModalFinance} mode='edit' onClose={() => setShowModalFinance(false)} duplicateData={item} recurrendeDuplicates={recurrenceDuplicates}/>}
                </TouchableOpacity>
            }
        </>

    )
}