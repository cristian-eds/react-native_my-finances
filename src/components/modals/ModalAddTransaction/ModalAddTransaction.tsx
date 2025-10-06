import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import { styles } from './ModalAddTransactionStyles';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { TextInpuWithLeftLabel } from '../../TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimeInput } from '../../DateTimeInput/DateTimeInput';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { transactionSchemas } from '../../../schemas/transactionSchemas';
import { useTransactionStore } from '../../../stores/TransactionStore';
import { useSQLiteContext } from 'expo-sqlite';
import { useAccountStore } from '../../../stores/AccountStore';
import { MovementType } from '../../../domain/enums/movementTypeEnum';

interface ModalAddTransactionProps {
    isShow: boolean;
    onClose: () => void;
}

export function ModalAddTransaction({ isShow, onClose }: ModalAddTransactionProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: '',
            paymentDate: new Date().toISOString(),
            value: 0
        }
    });

    const { addTransaction } = useTransactionStore();
    const { activeAccount } = useAccountStore();

    const database = useSQLiteContext();

    const handleCreateTransaction = async () => {
        const formValues = watch();

        const newTransaction = {
            accountId: activeAccount?.id as number,
            value: formValues.value as number,
            description: formValues.description,
            movementType: MovementType.Despesa,
            paymentDate: formValues.paymentDate as Date,
        }
        const isInserted = await addTransaction(newTransaction, database);

        if (isInserted) {
            Alert.alert("Transação criada com sucesso!");
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
                        <ButtonBack onPress={onClose} />
                        <Text style={styles.title}>Novo Lançamento</Text>
                        <View style={styles.rightSpacer}></View>
                    </View>
                    <View>
                        <TextInpuWithLeftLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required />
                        <TextInpuWithLeftLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='R$...' required />
                        <DateTimeInput control={control} name='paymentDate' labelText='Data pagamento' required={true} />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleCreateTransaction)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}