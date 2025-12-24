import React, { useState } from 'react';
import { View } from 'react-native';

import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { SectionItemLink } from '../../components/SectionItemLink/SectionItemLink';
import { ModalNotification } from '../../components/modals/ModalNotification/ModalNotification';

export function Configuration() {

  const [showModalNotifications, setShowModalNotifications] = useState<boolean>();

  return (
    <View style={GlobalStyles.container_screens_normal}>
      <SectionWithTitle title='Configurações'>
        <SectionItemLink iconName='options-outline' text='Parâmetros' subText='Gerais, finanças, lançamentos'/>
        <SectionItemLink iconName='notifications-outline' text='Notificações' subText='Gerais, finanças, lançamentos' onPress={() => setShowModalNotifications(true)}/>
      </SectionWithTitle>

      <SectionWithTitle title='Suporte'>
        <SectionItemLink iconName='chatbox-outline' text='Contato' subText='Fale conosco'/>
        <SectionItemLink iconName='information-circle-outline' text='Sobre nós' subText='Informações'/>
      </SectionWithTitle>

      {showModalNotifications && <ModalNotification isShow={showModalNotifications} onClose={() => setShowModalNotifications(false)} /> }
    </View>
  );
}