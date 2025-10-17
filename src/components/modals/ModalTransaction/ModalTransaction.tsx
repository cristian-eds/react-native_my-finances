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


interface ModalTransactionProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit',
    transactionData?: Transaction
}

export function ModalTransaction({ isShow, onClose, mode, transactionData }: ModalTransactionProps) {

    const { activeAccount, accounts } = useAccountStore();

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: transactionData?.description ?? '',
            paymentDate: transactionData?.paymentDate ?? new Date().toISOString(),
            value: transactionData?.value.toFixed(2) ?? 0,
            movementType: transactionData?.movementType ?? MovementType.Despesa,
            category: transactionData?.categoryId?.toString() ?? undefined,
            accountId: transactionData?.accountId ?? Number(activeAccount?.id) 
        }
    });

    const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
    const { categories } = useCategoryStore();

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const database = useSQLiteContext();

    const movementTypeItems = Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })
    const accountItems = accounts.map(acc => {return {label: acc.name, value: acc.id}})
    const categoriesItems = categories.map(category => {
        return {
            label: category.description,
            value: category.id.toString(),
            icon: () =>  <View key={category.id} style={{backgroundColor: category.hexColor, borderRadius: 50, padding:2}}><Ionicons name={category.iconName} size={24} color="black" /></View>
        }
    })


    const handleCreateTransaction = async () => {
        const formValues = watch();

        const newTransaction = {
            accountId: formValues.accountId,
            value: Number(formValues.value),
            description: formValues.description,
            movementType: formValues.movementType,
            paymentDate: new Date(formValues.paymentDate as Date),
            id: transactionData?.id as number,
            categoryId: Number(formValues.category)  ?? undefined
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
                        <ButtonBack onPress={handleClose} />
                        <Text style={styles.title}>{mode === 'add' ? 'Novo Lançamento' : 'Editar Lançamento'}</Text>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={() => setShowModalConfirmDelete(true)} style={{ width: '15%', alignItems: "flex-end" }} /> :
                            <View style={styles.rightSpacer}></View>}
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required />
                        <TextInputWithTopLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='R$ 00,00' required />
                        <DatePickerWithTopLabel control={control} name='paymentDate' errors={errors.paymentDate} mode='datetime' title='Data pagamento' required />
                        <PickerWithTopLabel control={control} name='category' errors={errors.movementType} labelText='Categoria' items={categoriesItems} zIndex={40000}/>
                        <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} zIndex={30000} zIndexInverse={20000} />
                        <PickerWithTopLabel control={control} name='accountId' errors={errors.accountId} labelText='Conta' items={accountItems} zIndex={20000} zIndexInverse={30000}/>
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