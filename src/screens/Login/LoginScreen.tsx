import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './LogingScreenStyles';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo</Text>
      <View>
        <TextInputCustom placeholder='CPF:' iconName='perm-identity' />
        <TextInputCustom placeholder='Senha:' iconName='lock-outline' secureTextEntry={true}></TextInputCustom>
        <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
      </View>
      <View>
        <ButtonPrincipal title='Entrar' />
        <ButtonPrincipal title='Cadastrar' />
      </View>
    </View>
  );
}