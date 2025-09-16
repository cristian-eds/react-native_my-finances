import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../routes/RootStackParamList';

import { styles } from './RegisterScreenStyles';
import {styles as globalStyles}  from '../../styles/GlobalStyles';

import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';


export function RegisterScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={globalStyles.container_screens_auth}>
      <Text style={globalStyles.title_screens_auth}>Registro</Text>
      <View>
        <TextInputCustom placeholder='Informe seu nome: ' />
        <TextInputCustom placeholder='Informe seu CPF: ' />
        <TextInputCustom placeholder='Digite sua senha: ' secureTextEntry={true} />
        <TextInputCustom placeholder='Confirme sua senha: ' secureTextEntry={true} />
      </View>
 
      <View>
        <ButtonPrincipal title='Avançar' onPress={() => navigation.navigate('RegisterInitialAccount')}/>
        <DividerTextMiddle />
        <ButtonPrincipal title='Entrar' onPress={() => navigation.navigate('Login')} />
      </View>

    </View>
  );
}