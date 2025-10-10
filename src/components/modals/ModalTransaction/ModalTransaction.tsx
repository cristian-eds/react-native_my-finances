import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import { styles } from './ModalTransactionStyles';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
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

interface ModalTransactionProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit'
}

export function ModalTransaction({ isShow, onClose, mode }: ModalTransactionProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: '',
            paymentDate: new Date().toISOString(),
            value: 0,
            movementType: MovementType.Despesa
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
            movementType: formValues.movementType,
            paymentDate: new Date(formValues.paymentDate as Date),
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
                        <Text style={styles.title}>{mode === 'add' ? 'Novo Lançamento' : 'Editar Lançamento'}</Text>
                        <View style={styles.rightSpacer}></View>
                    </View>
                    <View style={{rowGap: 10}}>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Insira uma descrição' required/>
                        <TextInputWithTopLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='R$ 00,00' required />
                        <DatePickerWithTopLabel control={control} name='paymentDate' errors={errors.paymentDate} mode='datetime' title='Data pagamento' required/>
                        <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' optionsEnum={MovementType}/>
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