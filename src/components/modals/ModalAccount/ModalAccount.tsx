import { Text, View, Modal, Alert } from 'react-native'
import React, { useState } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ModaAccountStyles'
import { useForm } from 'react-hook-form';
import { accountSchemas } from '../../../utils/schemas/accountSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { TypeAccount } from '../../../domain/enums/typeAccountEnum';
import { Status } from '../../../domain/enums/statusEnum';
import { useUserContext } from '../../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';

import { useAccountStore } from '../../../stores/AccountStore';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { Row } from '../structure/Row/Row';
import { Cell } from '../structure/Cell/Cell';
import { TouchableOpacity } from 'react-native';

interface ModalAccountProps {
    isShow: boolean;
    onClose: () => void;
}

const ModalAccount = ({ isShow, onClose }: ModalAccountProps) => {

    const context = useUserContext();
    const db = useSQLiteContext();
    const [showMoreInputs, setShowMoreInputs] = useState(false);

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

    const itemsToDropDown = Object.keys(TypeAccount).map((text) => { return { label: text, value: TypeAccount[text as keyof typeof TypeAccount] } })

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
                        <ButtonBack onPress={handleCloseModal} />
                        <Row>
                            <Ionicons name="card-outline" size={24} color="green" style={{ top: -4 }} />
                            <Text style={styles.title}>Nova Conta</Text>
                        </Row>
                        <View style={styles.rightSpacer}>
                        </View>
                    </View>
                    <View style={styles.inputs}>
                        <Text style={styles.inputsTitle}>INFORMAÇÕES BÁSICAS</Text>
                        <TextInputWithTopLabel control={control} title='Nome' errors={errors.name} name='name' placeholder='Nome*:' showLabel={false} required />
                        <TextInputWithTopLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial*:' showLabel={false} required />
                        <PickerWithTopLabel items={itemsToDropDown} control={control} labelText='Tipo conta' errors={errors.type} name='type'/>
                        <TouchableOpacity style={styles.showMore} onPress={() => setShowMoreInputs(!showMoreInputs)}>
                            <Text style={styles.showMoreText}>Preencher detalhes da conta...</Text>
                            <Ionicons name={showMoreInputs ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
                        </TouchableOpacity>
                        {showMoreInputs && <>
                            <Text style={styles.inputsTitle}>DETALHES DA CONTA</Text>
                            <TextInputWithTopLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' showLabel={false}/>
                            <Row>
                                <Cell>
                                    <TextInputWithTopLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' showLabel={false}/>
                                </Cell>
                                <Cell>
                                    <TextInputWithTopLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' showLabel={false}/>
                                </Cell>
                            </Row>
                            <TextInputWithTopLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' showLabel={false}/>
                        </>}
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

