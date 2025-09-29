import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import { styles } from './AccountDetailsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchemas } from '../../schemas/accountSchemas';
import { useForm } from 'react-hook-form';

import * as accountService from '../../services/accountService';
import { Status } from '../../domain/statusEnum';
import { useUserContext } from '../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PrincipalStackParamList } from '../../routes/types/PrincipalStackParamList';

export function AccountDetails() {

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(accountSchemas),
    })

    const route = useRoute<RouteProp<PrincipalStackParamList, 'AccountDetails'>>();
    const { account } = route.params;

    console.log(account);

    const db = useSQLiteContext();
    const context = useUserContext()

    const handleUpdateAccount = async () => {
        const formValues = watch();
        const idConta = await accountService.save(
            {
                accountNumber: formValues.accountNumber ?? "",
                agency: formValues.agency ?? "",
                balance: account.balance,
                bankCode: formValues.bankCode ?? "",
                holderName: formValues.holderName ?? "",
                name: formValues.name,
                status: Status.Ativo,
                type: formValues.type

            }, Number(context.user?.id), db);
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 16 }}>Conta</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title_account}>Caixa</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </View>
                </View>
                <ButtonPlus />
            </View>
            <View>
                <Text style={styles.title_section}>Dados da conta</Text>
                <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' placeholderTextColor='#090909e8' defaultValue={account.bankCode} />
                <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' placeholderTextColor='#090909e8' defaultValue={account.accountNumber} />
                <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' placeholderTextColor='#090909e8' defaultValue={account.agency} />
                <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' placeholderTextColor='#090909e8' defaultValue={account.holderName} />

                <Text style={[styles.title_section, { marginTop: 15 }]}>Informações</Text>
                <TextInpuWithLeftLabel control={control} title='Data Cadastro' errors={errors.bankCode} name='bankCode' placeholder='Data cadastro' placeholderTextColor='#090909e8' readOnly={true} />
                <TextInpuWithLeftLabel control={control} title='Situação' errors={errors.bankCode} name='bankCode' placeholder='Situação' placeholderTextColor='#090909e8' readOnly={true} />
            </View>
            <View>
                <ButtonPrincipal title='Inativar conta' style={{ marginTop: 20, marginBottom: 20 }} />
                <ButtonPrincipal title='Excluir conta' />
            </View>
        </View>
    );
}