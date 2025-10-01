import { Text, View, Modal } from 'react-native'
import React from 'react'

import { styles } from './ModalAddAccountStyles'
import { TextInpuWithLeftLabel } from '../../TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../PickerWithLeftLabel/PickerWithLeftLabel';
import { useForm } from 'react-hook-form';
import { accountSchemas } from '../../../schemas/accountSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonPrincipal } from '../../buttons/ButtonPrincipal/ButtonPrincipal';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';

interface ModalAddAccountProps {
    isShow: boolean;
}

const ModalAddAccount = ({ isShow }: ModalAddAccountProps) => {

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(accountSchemas),
    })

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <View style={styles.header}>
                        <ButtonBack />
                    </View>
                    <View>
                        <Text style={styles.title}>Nova Conta</Text>
                        <TextInpuWithLeftLabel control={control} title='Nome' errors={errors.name} name='name' placeholder='Informe seu nome' required />
                        <TextInpuWithLeftLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial da conta' required />
                        <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
                        <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                        <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
                        <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
                        <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />
                    </View>
                    <View style={styles.buttons_footer}>
                        <ButtonPrincipal title='Cadastrar' onPress={() => { }} />
                        <ButtonPrincipal title='Cancelar' onPress={() => { }} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalAddAccount

