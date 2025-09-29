import React, { useContext } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

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
import { useSQLiteContext } from 'expo-sqlite';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PrincipalStackParamList } from '../../routes/types/PrincipalStackParamList';
import { RowWithLeftLabel } from '../../components/RowWithLeftLabel/RowWithLeftLabel';
import { updateAccountSchemas } from '../../schemas/updateAccountSchemas';

export function AccountDetails() {

    const { control, handleSubmit, watch, formState: { errors, isDirty } } = useForm({
        resolver: zodResolver(updateAccountSchemas),
    })

    const route = useRoute<RouteProp<PrincipalStackParamList, 'AccountDetails'>>();
    const { account } = route.params;

    const db = useSQLiteContext();

    const handleUpdateAccount = async () => {
        const formValues = watch();
        const isUpdated = await accountService.update(
            {
                accountNumber: formValues.accountNumber ?? "",
                agency: formValues.agency ?? "",
                bankCode: formValues.bankCode ?? "",
                holderName: formValues.holderName ?? "",
                name: formValues.name,
                type: formValues.type,
                id: account.id
            }, db);
        if (isUpdated) {
            Alert.alert("Conta atualizada com sucesso!");
        }
    }

    return (
        <ScrollView style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <View>
                    <Text style={{ fontSize: 16 }}>Conta</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.title_account}>{account.name}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </View>
                </View>
                <ButtonPlus />
            </View>
            <View>
                <Text style={styles.title_section}>Dados da conta</Text>
                <TextInpuWithLeftLabel control={control} title='Nome da Conta' errors={errors.name} name='name' placeholder='Nome da conta' defaultValueProp={account.name}/>
                <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco'  defaultValueProp={account.bankCode}/>
                <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
                <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' defaultValueProp={account.accountNumber} />
                <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência'  defaultValueProp={account.agency}/>
                <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' defaultValueProp={account.holderName} />

                <Text style={[styles.title_section, { marginTop: 15 }]}>Informações</Text>
    
                <RowWithLeftLabel labelText='Data Cadastro' containerStyles={{ justifyContent: 'space-between', height: 50 }}>
                    <Text>20/09/2025</Text>
                </RowWithLeftLabel>
                <RowWithLeftLabel labelText='Status' containerStyles={{ justifyContent: 'space-between', height: 50 }}>
                    <Text>Ativo</Text>
                </RowWithLeftLabel>
                
            </View>
            <View>
                <ButtonPrincipal title='Inativar conta' style={{ marginTop: 20, marginBottom: 20 }} />
                {isDirty && <ButtonPrincipal title='Salvar Alterações' onPress={handleSubmit(handleUpdateAccount)}/>}
            </View>
        </ScrollView>
    );
}