import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './RegisterInitialAccountScreenStyles';
import {styles as globalStyles}  from '../../styles/GlobalStyles';
import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';

export function RegisterInitialAccountScreen() {
  return (
    <View style={globalStyles.container_screens_auth}>
        <Text style={globalStyles.title_screens_auth}>Cadastro      Conta Inicial</Text> 
        <View>
            <Text>Dados da conta</Text>
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
             <TextInpuWithLeftLabel />
        </View>
        <View> 
            <ButtonPrincipal title='Avançar' />
            <ButtonPrincipal title='Voltar' />
        </View>
    </View> 
  );
}