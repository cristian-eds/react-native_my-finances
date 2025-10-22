import { Text, View, Modal, Alert } from 'react-native'
import React from 'react'

import { styles } from './ModaAccountStyles'
import { TextInpuWithLeftLabel } from '../../TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../PickerWithLeftLabel/PickerWithLeftLabel';
import { useForm } from 'react-hook-form';
import { accountSchemas } from '../../../schemas/accountSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonPrincipal } from '../../buttons/ButtonPrincipal/ButtonPrincipal';
import { TypeAccount } from '../../../domain/enums/typeAccountEnum';
import { Status } from '../../../domain/enums/statusEnum';
import { useUserContext } from '../../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';

import { useAccountStore } from '../../../stores/AccountStore';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalAccountProps {
    isShow: boolean;
    onClose: () => void;
}

const ModalAccount = ({ isShow, onClose }: ModalAccountProps) => {

    const context = useUserContext();
    const db = useSQLiteContext();

    const { createAccount } = useAccountStore();

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

    const handleRegisterAccount = async () => {
        const formValues = watch();
        const newAccount = {
            accountNumber: formValues.accountNumber ?? "",
            agency: formValues.agency ?? "",
            balance: Number(formValues.balance) ?? 0,
            bankCode: formValues.bankCode ?? "",
            holderName: formValues.holderName ?? "",
            name: formValues.name,
            status: Status.Ativo,
            type: formValues.type,
            creationDate: new Date().toISOString()
        };

        const idNewAccount = await createAccount(newAccount, context.user?.id as number, db);

        if (idNewAccount) {
            Alert.alert("Sucesso", "Conta criada com sucesso!");
            handleCloseModal();
        }
    }

    const handleCloseModal = () => {
        reset();
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <View style={styles.header}>
                        <ButtonBack onPress={handleCloseModal}/>
                        <Text style={styles.title}>Nova Conta</Text>
                        <View style={styles.rightSpacer}>
                        </View>
                    </View>
                    <View >
                        <TextInpuWithLeftLabel control={control} title='Nome' errors={errors.name} name='name' placeholder='Informe seu nome' required />
                        <TextInpuWithLeftLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial da conta' required />
                        <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
                        <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                        <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
                        <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
                        <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={handleCloseModal} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleRegisterAccount)} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAccount

