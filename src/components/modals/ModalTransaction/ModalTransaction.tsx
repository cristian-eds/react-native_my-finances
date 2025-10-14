import React, { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

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

interface ModalTransactionProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit',
    transactionData?: Transaction
}

export function ModalTransaction({ isShow, onClose, mode, transactionData }: ModalTransactionProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: transactionData?.description ?? '',
            paymentDate: transactionData?.paymentDate ?? new Date().toISOString(),
            value: transactionData?.value.toFixed(2) ?? 0,
            movementType: transactionData?.movementType ?? MovementType.Despesa
        }
    });

    const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
    const { activeAccount } = useAccountStore();

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const database = useSQLiteContext();

    const movementTypeItems =  Object.keys(MovementType).map((text) => { return { label: text, value: MovementType[text as keyof typeof MovementType] } })
    

    const handleCreateTransaction = async () => {
        const formValues = watch();

        const newTransaction = {
            accountId: activeAccount?.id as number,
            value: Number(formValues.value),
            description: formValues.description,
            movementType: formValues.movementType,
            paymentDate: new Date(formValues.paymentDate as Date),
            id: transactionData?.id as number
        }

        let isSaved = false;

        if (mode === 'add') {
            isSaved = await addTransaction(newTransaction, database);
        } else if (mode === 'edit') {
            isSaved = await updateTransaction(newTransaction, database);
        }

        if (isSaved) {
            Alert.alert("Transação salva com sucesso!");
            reset();
            onClose();
        }
    }

    const handleDeleteTransaction = async () => {
        const isDeleted = await deleteTransaction(transactionData?.id as number, database);
        if (isDeleted) {
            Alert.alert("Transação deletada com sucesso!");
            reset();
            onClose();
        }
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
                        <ButtonIconSimple iconName='arrow-back' onPress={onClose} style={{ width: '15%' }} />
                        <Text style={styles.title}>{mode === 'add' ? 'Novo Lançamento' : 'Editar Lançamento'}</Text>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={()=>setShowModalConfirmDelete(true)} style={{ width: '15%', alignItems: "flex-end" }} /> :
                            <View style={styles.rightSpacer}></View>}
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required />
                        <TextInputWithTopLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='R$ 00,00' required />
                        <DatePickerWithTopLabel control={control} name='paymentDate' errors={errors.paymentDate} mode='datetime' title='Data pagamento' required />
                        <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleCreateTransaction)} />
                    </View>
                </View>
            </View>
            <ModalConfirm isShow={showModalConfirmDelete} title='Confirma exclusão da transação?' onClose={() => setShowModalConfirmDelete(false)} onConfirm={handleDeleteTransaction}/>
        </Modal>
    );
}