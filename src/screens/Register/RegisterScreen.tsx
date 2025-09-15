import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../routes/RootStackParamList';

import { styles } from './RegisterScreenStyles';

import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';


export function RegisterScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View>
        <TextInputCustom placeholder='Informe seu nome: ' />
        <TextInputCustom placeholder='Informe seu CPF: ' />
        <TextInputCustom placeholder='Digite sua senha: ' secureTextEntry={true} />
        <TextInputCustom placeholder='Confirme sua senha: ' secureTextEntry={true} />
      </View>

      <View>
        <ButtonPrincipal title='Cadastro' />
        <DividerTextMiddle />
        <ButtonPrincipal title='Entrar' onPress={() => navigation.navigate('Login')} />
      </View>

    </View>
  );
}