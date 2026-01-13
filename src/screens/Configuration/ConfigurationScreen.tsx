import React, { useState } from 'react';
import { View } from 'react-native';

import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { SectionItemLink } from '../../components/SectionItemLink/SectionItemLink';
import { ModalNotification } from '../../components/modals/ModalNotification/ModalNotification';
import { ModalParameters } from '../../components/modals/ModalParameters/ModalParameters';
import { ModalAbout } from '../../components/modals/ModalAbout/ModalAbout';

export function Configuration() {

  const [showModalNotifications, setShowModalNotifications] = useState<boolean>(false);
  const [showModalParameters, setShowModalParameters] = useState<boolean>(false);
  const [showModalAbout, setShowModalAbout] = useState<boolean>(false);

  return (
    <View style={GlobalStyles.container_screens_normal}>
      <SectionWithTitle title='Configurações'>
        <SectionItemLink iconName='options-outline' text='Parâmetros' subText='Gerais, finanças, lançamentos' onPress={() => setShowModalParameters(true)} />
        <SectionItemLink iconName='notifications-outline' text='Notificações' subText='Gerais, finanças, lançamentos' onPress={() => setShowModalNotifications(true)} />
      </SectionWithTitle>

      <SectionWithTitle title='Suporte'>
        <SectionItemLink iconName='chatbox-outline' text='Contato' subText='Fale conosco' />
        <SectionItemLink iconName='information-circle-outline' text='Sobre nós' subText='Informações' onPress={() => setShowModalAbout(true)}/>
      </SectionWithTitle>

      {showModalNotifications && <ModalNotification isShow={showModalNotifications} onClose={() => setShowModalNotifications(false)} />}
      {showModalParameters && <ModalParameters isShow={showModalParameters} onClose={() => setShowModalParameters(false)} />}
      {showModalAbout && <ModalAbout isShow={showModalAbout} onClose={() => setShowModalAbout(false)} />}
    </View>
  );
}