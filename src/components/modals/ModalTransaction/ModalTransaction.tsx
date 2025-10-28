import React, { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ModalTransactionStyles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { transactionSchemas } from '../../../schemas/transactionSchemas';
import { useTransactionStore } from '../../../stores/TransactionStore';
import { useSQLiteContext } from 'expo-sqlite';
import { useAccountStore } from '../../../stores/AccountStore';
import { MovementType } from '../../../domain/enums/movementTypeEnum';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { DatePickerWithTopLabel } from '../../DatePickerWithTopLabel/DatePickerWithTopLabel';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { Transaction } from '../../../domain/transactionModel';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { Account } from '../../../domain/accountModel';
import { Row } from '../structure/Row/Row';
import { Cell } from '../structure/Cell/Cell';

interface ModalTransactionProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit',
    transactionData?: Transaction,
    activeAccount?: Account | null
}

export function ModalTransaction({ isShow, onClose, mode, transactionData, activeAccount }: ModalTransactionProps) {

    const { accounts } = useAccountStore();

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: transactionData?.description ?? '',
            paymentDate: transactionData?.paymentDate ?? new Date().toISOString(),
            value: transactionData?.value.toFixed(2) ?? 0,
            movementType: transactionData?.movementType ?? MovementType.Despesa,
            category: transactionData?.categoryId?.toString() ?? undefined,
            accountId: transactionData?.accountId.toString() ?? activeAccount?.id.toString(),
            destinationAccountId: transactionData?.destinationAccountId?.toString() ?? ''
        }
    });

    const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
    const { categories } = useCategoryStore();

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const database = useSQLiteContext();

    const movementTypeItems = Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })
    const accountItems = accounts.map(acc => { return { label: acc.name, value: acc.id.toString() } });
    const destinationAccountsItems = accounts.filter(acc => acc.id.toString() !== watch().accountId).map(acc => { return { label: acc.name, value: acc.id.toString() } });  
    const categoriesItems = categories.map(category => {
        return {
            label: category.description,
            value: category.id.toString(),
            icon: () => <View key={category.id} style={{ backgroundColor: category.hexColor, borderRadius: 50, padding: 2 }}><Ionicons name={category.iconName} size={24} color="black" /></View>
        }
    })

    const handleCreateTransaction = async () => {
        const formValues = watch();

        const newTransaction = {
            accountId: Number(formValues.accountId),
            value: Number(formValues.value),
            description: formValues.description,
            movementType: formValues.movementType,
            paymentDate: new Date(formValues.paymentDate as Date),
            id: transactionData?.id as number,
            categoryId: Number(formValues.category) ?? undefined,
            destinationAccountId: Number(formValues.destinationAccountId)
        }

        let isSaved = false;

        if (mode === 'add') {
            isSaved = await addTransaction(newTransaction, database);
        } else if (mode === 'edit') {
            isSaved = await updateTransaction(newTransaction, database);
        }

        if (isSaved) {
            Alert.alert("Transação salva com sucesso!");
            handleClose();
        }
    }

    const handleDeleteTransaction = async () => {
        const isDeleted = await deleteTransaction(transactionData?.id as number, database);
        if (isDeleted) {
            Alert.alert("Transação deletada com sucesso!");
            handleClose()
        }
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}>
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <View style={styles.header}>
                        <ButtonBack onPress={handleClose}  />
                        <Row style={{flex: 4}}>
                            <Ionicons name="receipt-outline" size={18} color="green" style={{top: -3}} />
                            <Text style={styles.title}>{mode === 'add' ? 'Novo Lançamento' : 'Editar Lançamento'}</Text>
                        </Row>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={() => setShowModalConfirmDelete(true)} style={{ width: '15%', alignItems: "flex-end", top: -3 }} /> :
                            <View style={styles.rightSpacer}></View>}
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <Text style={styles.inputsTitle}>INFORMAÇÕES LANÇAMENTO</Text>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Descrição*:' required showLabel={false}/>
                        <TextInputWithTopLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='Valor*: R$ 00,00' required showLabel={false}/>
                        <DatePickerWithTopLabel control={control} name='paymentDate' errors={errors.paymentDate} mode='datetime' title='Data pagamento' required showLabel={false}/>
                        <Row>
                            <Cell>
                                <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} zIndex={30000} zIndexInverse={20000} placeholder='Tipo Movimento:' showLabel={false}/>
                            </Cell>
                            <Cell>
                                <PickerWithTopLabel control={control} name='category' errors={errors.movementType} labelText='Categoria' items={categoriesItems} zIndex={40000} placeholder='Categoria:' showLabel={false}/>
                            </Cell>
                        </Row>
                        <Text style={[styles.inputsTitle, {marginTop: 7}]}>CONTAS</Text>
                        <Row>
                            <Cell>
                                <PickerWithTopLabel control={control} name='accountId' errors={errors.accountId} labelText='Conta' items={accountItems} zIndex={20000} zIndexInverse={30000} showLabel={false} placeholder='Conta origem'/>
                            </Cell>
                            {watch().movementType === MovementType.Transferencia &&
                                <Cell>
                                    <PickerWithTopLabel control={control} name='destinationAccountId' errors={errors.destinationAccountId} labelText='Conta Destino' items={destinationAccountsItems} zIndex={20000} zIndexInverse={30000} showLabel={false} placeholder='Conta Destino'/>
                                </Cell>}
                        </Row>

                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={handleClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleCreateTransaction)} />
                    </View>
                </View>
            </View>
            <ModalConfirm isShow={showModalConfirmDelete} title='Confirma exclusão da transação?' onClose={() => setShowModalConfirmDelete(false)} onConfirm={handleDeleteTransaction} />
        </Modal>
    );
}