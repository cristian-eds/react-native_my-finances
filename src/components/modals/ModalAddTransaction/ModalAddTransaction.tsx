import React from 'react';
import { Modal, Text, View } from 'react-native';

import { styles } from './ModalAddTransactionStyles';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { TextInpuWithLeftLabel } from '../../TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../PickerWithLeftLabel/PickerWithLeftLabel';
import { ButtonPrincipal } from '../../buttons/ButtonPrincipal/ButtonPrincipal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeAccount } from '../../../domain/enums/typeAccountEnum';
import { accountSchemas } from '../../../schemas/accountSchemas';

interface ModalAddTransactionProps {
    isShow: boolean;
    onClose: () => void;
}

export function ModalAddTransaction({ isShow, onClose }: ModalAddTransactionProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
        resolver: zodResolver(accountSchemas),
        defaultValues: {
            name: '',
            balance: 0,
            bankCode: '',
            type: TypeAccount.Corrente,
            accountNumber: '',
            agency: '',
            holderName: ''
        }
    })
    const handleRegisterAccount = () => {
        const formValues = watch();
        console.log(formValues);
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
                    </View>
                    <View>
                        <Text style={styles.title}>Novo Lançamento</Text>
                        <TextInpuWithLeftLabel control={control} title='Descrição' errors={errors.name} name='name' placeholder='Insira uma descrição' required />
                        <TextInpuWithLeftLabel control={control} title='Valor R$' errors={errors.balance} name='balance' placeholder='Valor da transação' required />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonPrincipal title='Cadastrar' onPress={handleSubmit(handleRegisterAccount)} />
                        <ButtonPrincipal title='Cancelar' onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}