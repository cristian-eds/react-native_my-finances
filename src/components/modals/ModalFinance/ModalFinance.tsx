import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ModalFinanceStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { Spacer } from '../../Spacer/Spacer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FinanceFormFields, financeSchemas } from '../../../utils/schemas/financeSchemas';
import { DuplicateModel } from '../../../domain/duplicateModel';
import { MovementType } from '../../../domain/enums/movementTypeEnum';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useDuplicateStore } from '../../../stores/DuplicateStores';
import { useSQLiteContext } from 'expo-sqlite';
import { Transaction } from '../../../domain/transactionModel';
import { TransactionItem } from '../../TransactionItem/TransactionItem';
import { ButtonPlus } from '../../buttons/ButtonPlus/ButtonPlus';
import { ModalTransaction } from '../ModalTransaction/ModalTransaction';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';
import { TabRecurrence } from './TabRecurrence/TabRecurrence';
import { useUserContext } from '../../../hooks/useUserContext';
import { ModalInstallments } from '../ModalInstallments/ModalInstallments';
import { TabInfos } from './TabInfos/TabInfos';

interface ModalFinanceProps {
    isShow: boolean,
    mode: 'edit' | 'add',
    duplicateData?: DuplicateModel,
    recurrendeDuplicates?: DuplicateModel[],
    onClose: () => void
}

type TabActive = 'INFO' | 'PAYMENTS' | 'RECURRENCE';

export function ModalFinance({ isShow, mode, duplicateData, recurrendeDuplicates, onClose }: ModalFinanceProps) {

    const { addDuplicate, updateDuplicate, deleteDuplicate, payments } = useDuplicateStore();

    const [tabActive, setTabActive] = useState<TabActive>('INFO');
    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalInstallments, setShowModalInstallments] = useState(false);

    const { user } = useUserContext();

    const paymentsItem = payments.filter(pay => pay.duplicateId === duplicateData?.id)

    const database = useSQLiteContext();

    const { control, formState: { errors }, handleSubmit, watch, reset } = useForm<FinanceFormFields>({
        resolver: zodResolver(financeSchemas),
        defaultValues: {
            accountId: duplicateData?.accountId?.toLocaleString() ?? undefined,
            categoryId: duplicateData?.categoryId?.toLocaleString() ?? undefined,
            description: duplicateData?.description ?? '',
            dueDate: (() => {
                const dateValue = duplicateData?.dueDate;
                if (!dateValue) return undefined;
                return new Date(dateValue as Date).toISOString();
            })(),
            issueDate: (() => {
                const dateValue = duplicateData?.issueDate;
                if (!dateValue) return new Date().toISOString();
                return new Date(dateValue as Date).toISOString();
            })(),
            movementType: duplicateData?.movementType ?? MovementType.Despesa,
            totalValue: duplicateData?.totalValue.toLocaleString() ?? ''
        }
    });

    const handleConfirm = async () => {
        const formValues = watch();

        const newDuplicate: DuplicateModel = {
            accountId: Number(formValues.accountId),
            categoryId: Number(formValues.categoryId),
            description: formValues.description,
            dueDate: new Date(formValues.dueDate),
            issueDate: new Date(formValues.issueDate),
            movementType: formValues.movementType,
            totalValue: Number(formValues.totalValue),
            id: duplicateData?.id as number,
            numberInstallments: 1,
            notificationId: duplicateData?.notificationId
        }

        let isSaved;

        if (mode === 'add') {
            isSaved = await addDuplicate(newDuplicate, user?.id as number, database)
        } else if (mode === 'edit') {
            isSaved = await updateDuplicate(newDuplicate, database);
        }

        if (isSaved) {
            Alert.alert("Finança salva com sucesso!");
            handleClose();
        }
    }

    const handleDelete = async () => {
        if(duplicateData === undefined) return;
        const isDeleted = await deleteDuplicate(duplicateData, database);
        if (isDeleted) {
            Alert.alert("Finança excluída com sucesso");
            handleClose();
        }
    }

    const recurrenceDuplicatesToItems = () => {
        return recurrendeDuplicates?.map(dup => ({
            id: dup.id,
            sequencyItem: dup.numberInstallments,
            dueDate: new Date(dup.dueDate),
            value: dup.totalValue,
            description: dup.description,
        })) || [];
    }

    const dataToPayment = (): Transaction => {
        const data = watch();
        const remainingValue = paymentsItem && paymentsItem?.length > 0 ? Number(data.totalValue) - paymentsItem.reduce((prev, current) => prev += current.value, 0) : Number(data.totalValue);
        return {
            id: 0,
            accountId: Number(data.accountId) ?? 0,
            description: `Pago: ${data.description}`,
            movementType: data.movementType,
            paymentDate: new Date(),
            value: remainingValue,
            categoryId: Number(data.categoryId) ?? null,
            duplicateId: duplicateData?.id,
        }
    }

    const handleClose = () => {
        reset();
        onClose();
    }


    const renderTabsHeader = () => {
        return (
            <Row style={{ marginBottom: 7 }}>
                {renderTab('INFO', 'information-circle-outline', 'INFORMAÇÕES', () => setTabActive('INFO'))}
                <Text style={{ fontWeight: '800' }}>/</Text>
                {mode === 'edit' ? <>
                    {renderTab('PAYMENTS', 'calendar-outline', 'PAGAMENTOS', () => setTabActive('PAYMENTS'))}
                </> : <>
                    {renderTab('RECURRENCE', 'calendar-outline', 'RECORRÊNCIA', handleSubmit(() => setTabActive('RECURRENCE')))}
                </>}
            </Row>
        )
    }

    const renderTab = (tabName: TabActive, iconName: keyof typeof Ionicons.glyphMap, title: string, onPress: () => void) => {
        const isActive = tabActive === tabName;
        return (
            <TouchableOpacity onPress={onPress} style={isActive && styles.tabContainerActive}>
                <View style={[styles.tabContainer, { justifyContent: 'flex-end' }]}>
                    <Ionicons name={iconName} size={15} color={isActive ? 'black' : 'gray'} style={{ top: 1 }} />
                    <Text style={[styles.tabTitle, isActive && styles.tabActive, { textAlign: 'center' }]}>{title}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    const renderPayments = () => {
        return (
            <View>
                {paymentsItem && paymentsItem.length > 0 ?
                    <FlatList<Transaction>
                        data={paymentsItem}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <TransactionItem item={item} />}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    /> :
                    <View style={{ paddingTop: 20, paddingBottom: 15 }}>
                        <Text style={styles.textNoTransactions}>Nenhum pagamento registrado ainda.</Text>
                        <Text style={styles.textNoTransactions}>Adicione o primeiro:</Text>
                    </View>
                }
            </View>
        )
    }

    const renderTabsContent = () => {
        const data = watch();
        const item = {
            accountId: Number(data.accountId),
            categoryId: Number(data.categoryId),
            description: data.description,
            dueDate: new Date(data.dueDate),
            issueDate: new Date(data.issueDate),
            movementType: data.movementType,
            totalValue: Number(data.totalValue),
            numberInstallments: 1,
        }

        switch (tabActive) {
            case 'INFO':
                return <TabInfos control={control} errors={errors} recurrendeDuplicates={recurrendeDuplicates} setShowModalInstallments={setShowModalInstallments} />
            case 'PAYMENTS':
                return renderPayments();
            case 'RECURRENCE':
                return <TabRecurrence data={item} onClose={handleClose} />;
        }
    }

    const renderFooter = () => {
        return (
            <ModalFooter>
                {tabActive === 'INFO' ?
                    <>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirm)}  mode={Mode.CONFIRM} />
                    </> :
                    <>
                        {renderButtonPlus()}
                    </>
                }
            </ModalFooter>
        )
    }

    const renderButtonPlus = () => {
        if (!duplicateData) return null;
        if (paymentsItem.reduce((prev, current) => prev += current.value, 0) >= duplicateData.totalValue) return null;
        return <ButtonPlus onPress={() => setShowModalTransaction(true)} style={{ width: 110, height: 40, backgroundColor: '#96df87ff', borderRadius: 10 }} />
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}>
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'flex-end' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <ButtonBack onPress={onClose} />
                            <Row style={{ flex: 4, justifyContent: 'center' }}>
                                <Ionicons name="cash-outline" size={18} color="green" style={{ top: -3 }} />
                                <Text style={styles.title}>{mode === 'add' ? 'Nova Finança' : 'Editar Finança'}</Text>
                            </Row>
                            {mode === 'edit' ?
                                <ButtonIconSimple iconName='trash-outline' onPress={() => setShowModalDelete(true)} style={{ width: '15%', alignItems: "flex-end", top: -3 }} /> :
                                <Spacer />}
                        </ModalHeader>
                        <View style={{ rowGap: 10 }}>
                            {renderTabsHeader()}
                            {renderTabsContent()}
                        </View>
                        {renderFooter()}
                    </ModalContent>
                </ModalContainer>
                {showModalTransaction && <ModalTransaction isShow={showModalTransaction} mode='payment' onClose={() => setShowModalTransaction(false)} transactionData={dataToPayment()} duplicateData={duplicateData}/>}
                {showModalDelete && <ModalConfirm isShow={showModalDelete} onClose={() => setShowModalDelete(false)} onConfirm={handleDelete} title='Confirma a exclusão da finança?' />}
                {showModalInstallments && duplicateData && recurrendeDuplicates && <ModalInstallments isShow={showModalInstallments} onClose={() => setShowModalInstallments(false)} items={recurrenceDuplicatesToItems()} data={duplicateData} mode='edit' />}
            </KeyboardAvoidingView >
        </Modal>
    );
}