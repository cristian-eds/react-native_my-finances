import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSQLiteContext } from 'expo-sqlite';

import { Alert, ScrollView, Text, View } from 'react-native';


import { styles } from './AccountDetailsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { RowWithLeftLabel } from '../../components/RowWithLeftLabel/RowWithLeftLabel';
import { updateAccountSchemas } from '../../schemas/updateAccountSchemas';

import { useAccountStore } from '../../stores/AccountStore';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { Status } from '../../domain/enums/statusEnum';
import { SelectAccount } from '../../components/SelectAccount/SelectAccount';
import { formaterIsoDateToDefaultPattern } from '../../utils/DateFormater';
import { ModalConfirm } from '../../components/modals/ModalConfirm/ModalConfirm';
import ModalAccount from '../../components/modals/ModalAccount/ModalAccount';
import { useNavigation } from '@react-navigation/native';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { Row } from '../../components/modals/structure/Row/Row';


export function AccountDetails() {

    const { activeAccount, updateAccount, toggleStatusAccount, deleteAccount } = useAccountStore();
    const db = useSQLiteContext();
    const navigation = useNavigation();

    const [showModalAddAccount, setShowModalAddAccount] = useState(false);
    const [showModalConfirmDelete, setModalConfirmDelete] = useState(false);

    const { control, handleSubmit, watch, formState: { errors, isDirty }, reset } = useForm({
        resolver: zodResolver(updateAccountSchemas),
        defaultValues: {
            accountNumber: activeAccount?.accountNumber ?? "",
            agency: activeAccount?.agency ?? "",
            bankCode: activeAccount?.bankCode ?? "",
            holderName: activeAccount?.holderName ?? "",
            name: activeAccount?.name ?? "",
            type: activeAccount?.type ?? TypeAccount.Corrente
        }
    })


    const handleUpdateAccount = async () => {
        const formValues = watch();
        const newData = {
            accountNumber: formValues.accountNumber ?? "",
            agency: formValues.agency ?? "",
            bankCode: formValues.bankCode ?? "",
            holderName: formValues.holderName ?? "",
            name: formValues.name,
            type: formValues.type,
            id: activeAccount?.id as number
        };
        const isUpdated = await updateAccount(newData, db);
        if (isUpdated) {
            Alert.alert("Conta atualizada com sucesso!");
        }
    }

    const handleToggleStatusAccount = async () => {
        await toggleStatusAccount(activeAccount?.id as number, db);
    }

    const handleShowModalAddAccount = () => {
        setShowModalAddAccount(true);
    }

    const handleDeleteAccount = async () => {
        const isDeleted = await deleteAccount(activeAccount?.id as number, db);
        if (isDeleted) {
            Alert.alert("Conta excluída com sucesso!");
            setModalConfirmDelete(false);
        }
    }

    useEffect(() => {
        if (activeAccount) {
            reset(activeAccount)
        }
    }, [activeAccount]);

    useEffect(() => {
        navigation.getParent()?.setOptions(
            { title: 'Detalhes da conta' }
        )

        return () => {
            navigation.getParent()?.setOptions(
                { title: '' }
            )
        }
    }, [])

    return (
        <ScrollView style={GlobalStyles.container_screens_normal}>
            <Row>
                <ButtonBack onPress={() => navigation.goBack()} />
                <ButtonPlus onPress={handleShowModalAddAccount} />
            </Row>


            <View style={styles.containerContent}>
                <Text style={[GlobalStyles.sectionInputsText, { fontSize: 16, marginVertical: 10, textAlign: 'center' }]}>DADOS DA CONTA</Text>
                <SelectAccount containerStyle={{ width: '50%' }} labelStyle={{ textAlign: 'left' }} />
                <TextInpuWithLeftLabel control={control} title='Nome da Conta' errors={errors.name} name='name' placeholder='Nome da conta' />
                <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
                <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
                <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
                <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />


            </View>
            <View style={styles.containerContent}>
                <Text style={[GlobalStyles.sectionInputsText, { fontSize: 16, marginVertical: 10, textAlign: 'center' }]}>INFORMAÇÕES</Text>

                <RowWithLeftLabel labelText='Data Cadastro' containerStyles={{ justifyContent: 'space-between', height: 45 }}>
                    <Text>{activeAccount?.creationDate ? formaterIsoDateToDefaultPattern(new Date(activeAccount.creationDate)) : ""}</Text>
                </RowWithLeftLabel>
                <RowWithLeftLabel labelText='Status' containerStyles={{ justifyContent: 'space-between', height: 45 }}>
                    <Text>{activeAccount?.status}</Text>
                </RowWithLeftLabel>
            </View>
            <View>
                {isDirty ? <>
                    <ButtonPrincipal title='Salvar Alterações' onPress={handleSubmit(handleUpdateAccount)} style={{ marginTop: 15, marginBottom: 0 }} />
                    <ButtonPrincipal title='Cancelar Alterações' onPress={() => reset()} style={{ marginTop: 15 }} />
                </> : <>
                    <ButtonPrincipal title={`${activeAccount?.status === Status.Ativo ? 'Inativar' : 'Ativar'} conta`} style={{ marginTop: 15, marginBottom: 0 }} onPress={handleToggleStatusAccount} />
                    <ButtonPrincipal title='Excluir conta' onPress={() => setModalConfirmDelete(true)} style={{ marginTop: 15 }} />
                </>}

            </View>
            <View style={{ paddingBottom: 100 }}>
                <ModalAccount isShow={showModalAddAccount} onClose={() => setShowModalAddAccount(false)} />
                <ModalConfirm isShow={showModalConfirmDelete} title='Confirma a exclusão da conta?' onConfirm={handleDeleteAccount} onClose={() => setModalConfirmDelete(false)} />
            </View>
        </ScrollView>
    );
}