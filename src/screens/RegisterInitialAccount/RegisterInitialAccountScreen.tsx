import React, { useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import { AuthStackParamList } from '../../routes/types/AuthStackParamList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from './RegisterInitialAccountScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';

import { accountSchemas } from '../../schemas/accountSchemas';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';
import { Status } from '../../domain/statusEnum';

import * as accountService from '../../services/accountService';
import { UserContext } from '../../context/UserContext';


export function RegisterInitialAccountScreen() {

  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const db = useSQLiteContext();
  const context = useContext(UserContext);

  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterInitialAccount'>>();
  const {user} = route.params;
  

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(accountSchemas),
  })

  const handleRegisterAccount = async () => {
    const formValues = watch();
    const idConta = await accountService.save(
      {
        accountNumber: formValues.accountNumber ?? "",
        agency: formValues.agency ?? "",
        balance: Number(formValues.balance) ?? 0,
        bankCode: formValues.bankCode ?? "",
        holderName: formValues.holderName ?? "",
        name: formValues.name,
        status: Status.Ativo,
        type: formValues.type,
        creationDate: new Date().toISOString(),
      }, Number(user?.id), db);

    if(idConta) {
      Alert.alert("Conta criada!");
      context?.handleSetUser(user);
    }
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, { textAlign: 'right' }]}>Cadastro      Conta Inicial</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Dados da conta</Text>
          <TextInpuWithLeftLabel control={control} title='Nome' errors={errors.name} name='name' placeholder='Informe seu nome' placeholderTextColor='#090909e8' required />
          <TextInpuWithLeftLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial da conta' placeholderTextColor='#090909e8' required />
          <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' placeholderTextColor='#090909e8' />
          <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
          <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' placeholderTextColor='#090909e8' />
          <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' placeholderTextColor='#090909e8' />
          <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' placeholderTextColor='#090909e8'/>
        </View>
        <View>
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegisterAccount)} />
          <ButtonPrincipal title='Voltar' onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}