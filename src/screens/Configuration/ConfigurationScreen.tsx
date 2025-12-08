import React from 'react';
import { View } from 'react-native';

import { styles } from './ConfigurationScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { SectionItemLink } from '../../components/SectionItemLink/SectionItemLink';

export function Configuration() {
  return (
    <View style={GlobalStyles.container_screens_normal}>
      <SectionWithTitle title='Configurações'>
        <SectionItemLink iconName='options-outline' text='Parâmetros' subText='Gerais, finanças, lançamentos'/>
        <SectionItemLink iconName='notifications-outline' text='Notificações' subText='Gerais, finanças, lançamentos'/>
      </SectionWithTitle>

      <SectionWithTitle title='Suporte'>
        <SectionItemLink iconName='chatbox-outline' text='Contato' subText='Fale conosco'/>
        <SectionItemLink iconName='information-circle-outline' text='Sobre nós' subText='Informações'/>
      </SectionWithTitle>
    </View>
  );
}