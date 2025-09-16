import React from 'react';
import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/RootStackParamList';

import { styles } from './LogingScreenStyles';
import {styles as globalStyles}  from '../../styles/GlobalStyles';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';

export function LoginScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return ( 
    <View style={globalStyles.container_screens_auth}>
      <Text style={globalStyles.title_screens_auth}>Bem vindo</Text>            
      <View>  
        <TextInputCustom placeholder='CPF:' iconName='perm-identity' />
        <TextInputCustom placeholder='Senha:' iconName='lock-outline' secureTextEntry={true}></TextInputCustom>
        <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
      </View>
      <View> 
        <ButtonPrincipal title='Entrar' />
        <ButtonPrincipal title='Registrar-se' onPress={() => navigation.navigate("Register")}/>
      </View>
    </View>
  );
}