import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSQLiteContext } from 'expo-sqlite';

import { Alert, ScrollView, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './AccountDetailsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { RowWithLeftLabel } from '../../components/RowWithLeftLabel/RowWithLeftLabel';
import { updateAccountSchemas } from '../../schemas/updateAccountSchemas';

import { useStore } from '../../../store';
import { TypeAccount } from '../../domain/typeAccountEnum';

export function AccountDetails() {

    const { activeAccount, updateAccount } = useStore();

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

    const db = useSQLiteContext();


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
            reset(newData);
        }
    }

    return (
        <ScrollView style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 16 }}>Conta</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title_account}>{activeAccount?.name}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </View>
                </View>
                <ButtonPlus />
            </View>
            <View>
                <Text style={styles.title_section}>Dados da conta</Text>
                <TextInpuWithLeftLabel control={control} title='Nome da Conta' errors={errors.name} name='name' placeholder='Nome da conta' />
                <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
                <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
                <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
                <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />

                <Text style={[styles.title_section, { marginTop: 15 }]}>Informações</Text>

                <RowWithLeftLabel labelText='Data Cadastro' containerStyles={{ justifyContent: 'space-between', height: 50 }}>
                    <Text>20/09/2025</Text>
                </RowWithLeftLabel>
                <RowWithLeftLabel labelText='Status' containerStyles={{ justifyContent: 'space-between', height: 50 }}>
                    <Text>Ativo</Text>
                </RowWithLeftLabel>

            </View>
            <View>
                {isDirty ? <>
                    <ButtonPrincipal title='Salvar Alterações' onPress={handleSubmit(handleUpdateAccount)} style={{ marginTop: 20, marginBottom: 0 }} />
                    <ButtonPrincipal title='Cancelar Alterações' onPress={() => reset()} style={{ marginTop: 20 }} />
                </> : <>
                    <ButtonPrincipal title='Inativar conta' style={{ marginTop: 20, marginBottom: 0 }} />
                    <ButtonPrincipal title='Excluir conta' style={{ marginTop: 20 }} />
                </>}

            </View>
        </ScrollView>
    );
}