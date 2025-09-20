import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './RegisterInitialAccountScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/RootStackParamList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchemas } from '../../schemas/accountSchemas';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';

export function RegisterInitialAccountScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(accountSchemas),
  })

  const handleRegisterAccount = () => {
    console.log(watch());
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
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegisterAccount)} />
          <ButtonPrincipal title='Voltar' onPress={() => navigation.goBack()} />
        </View>
      </View>
    </View>
  );
}