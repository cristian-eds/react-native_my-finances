import React, { use } from 'react';
import { Text, View } from 'react-native';

import { styles } from './RegisterInitialAccountScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/RootStackParamList';

export function RegisterInitialAccountScreen() {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth,{textAlign: 'right'}]}>Cadastro      Conta Inicial</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Dados da conta</Text>
          <TextInpuWithLeftLabel name='Nome' placeholder='Informe seu nome' required />
          <TextInpuWithLeftLabel name='Saldo inicial' placeholder='Saldo inicial da conta' required />
          <TextInpuWithLeftLabel name='Código do banco' placeholder='Código do banco' />
          <TextInpuWithLeftLabel name='Tipo da conta' placeholder='Selecione tipo da conta' />
          <TextInpuWithLeftLabel name='Número da conta' placeholder='Número da conta' />
          <TextInpuWithLeftLabel name='Agência' placeholder='Agência' />
          <TextInpuWithLeftLabel name='Responsável' placeholder='Nome do responsável' />
        </View>
        <View>
          <ButtonPrincipal title='Avançar' onPress={() => navigation.push('WelcomeRegister')}/>
          <ButtonPrincipal title='Voltar' onPress={() => navigation.goBack()}/>
        </View>
      </View>
    </View>
  );
}