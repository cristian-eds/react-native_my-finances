import React, { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useRoute } from '@react-navigation/native';

import { styles } from './RegisterInitialAccountScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';

import { accountSchemas } from '../../utils/schemas/accountSchemas';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';
import { Status } from '../../domain/enums/statusEnum';

import { AuthStackParamList } from '../../routes/Stack/types/AuthStackParamList';
import { useAccountStore } from '../../stores/AccountStore';
import { useUserContext } from '../../hooks/useUserContext';
import { requestPermissions } from '../../utils/notifications/NotificationsConfig';
import { generateSessionToken } from '../../services/sessionTokenService';


export function RegisterInitialAccountScreen() {

  const db = useSQLiteContext();
  const context = useUserContext();

  const [loading, setLoading] = useState(false);

  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterInitialAccount'>>();
  const { user } = route.params;
  const { createAccount } = useAccountStore();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(accountSchemas),
  })

  const handleRegisterAccount = async () => {
    const formValues = watch();
    setLoading(true);
    const created = await createAccount(
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

    if (created) {
      Alert.alert("Conta criada!");
      await requestPermissions();
      context.handleSetUser(user);
      await generateSessionToken(user, db);
    }
    setLoading(false);
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, { textAlign: 'right' }]}>Cadastro      Conta Inicial</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Dados da conta</Text>
          <TextInpuWithLeftLabel control={control} title='Nome' errors={errors.name} name='name' placeholder='Informe seu nome' required />
          <TextInpuWithLeftLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial da conta' required />
          <TextInpuWithLeftLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
          <PickerWithLeftLabel control={control} labelText='Tipo conta' errors={errors.type} name='type' />
          <TextInpuWithLeftLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
          <TextInpuWithLeftLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
          <TextInpuWithLeftLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />
        </View>
        <View>
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegisterAccount)} loading={loading}/>
        </View>
      </View>
    </View>
  );
}