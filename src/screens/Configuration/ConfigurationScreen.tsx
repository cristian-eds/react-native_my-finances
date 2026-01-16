import React, { useState } from 'react';
import { View } from 'react-native';

import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { SectionItemLink } from '../../components/SectionItemLink/SectionItemLink';
import { ModalNotification } from '../../components/modals/ModalNotification/ModalNotification';
import { ModalParameters } from '../../components/modals/ModalParameters/ModalParameters';
import { ModalAbout } from '../../components/modals/ModalAbout/ModalAbout';
import { ModalContactUs } from '../../components/modals/ModalContactUs/ModalContactUs';
import { ButtonBackHome } from '../../components/buttons/ButtonBackHome/ButtonBackHome';

export function Configuration() {

  const [showModalNotifications, setShowModalNotifications] = useState<boolean>(false);
  const [showModalParameters, setShowModalParameters] = useState<boolean>(false);
  const [showModalAbout, setShowModalAbout] = useState<boolean>(false);
  const [showModalContactUs, setShowModalContactUs] = useState<boolean>(false);

  return (
    <View style={GlobalStyles.container_screens_normal}>
      <SectionWithTitle title='Configurações'>
        <SectionItemLink iconName='options-outline' text='Parâmetros' subText='Gerais, finanças, lançamentos' onPress={() => setShowModalParameters(true)} />
        <SectionItemLink iconName='notifications-outline' text='Notificações' subText='Gerais, finanças, lançamentos' onPress={() => setShowModalNotifications(true)} />
      </SectionWithTitle>

      <SectionWithTitle title='Suporte'>
        <SectionItemLink iconName='chatbox-outline' text='Contato' subText='Fale conosco' onPress={() => setShowModalContactUs(true)}/>
        <SectionItemLink iconName='information-circle-outline' text='Sobre nós' subText='Informações' onPress={() => setShowModalAbout(true)}/>
      </SectionWithTitle>
      <ButtonBackHome />

      {showModalNotifications && <ModalNotification isShow={showModalNotifications} onClose={() => setShowModalNotifications(false)} />}
      {showModalParameters && <ModalParameters isShow={showModalParameters} onClose={() => setShowModalParameters(false)} />}
      {showModalAbout && <ModalAbout isShow={showModalAbout} onClose={() => setShowModalAbout(false)} />}
      {showModalContactUs && <ModalContactUs isShow={showModalContactUs} onClose={() => setShowModalContactUs(false)} />}
    </View>
  );
}