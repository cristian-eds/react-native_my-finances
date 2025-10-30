import React from 'react';
import { Modal, Text } from 'react-native';

import { styles } from './ModalFiltersTransactionStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { View } from 'react-native';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Spacer } from '../../Spacer/Spacer';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';

interface ModalFiltersTransactionProps {
  isShow: boolean;
  onClose: () => void;
}

export function ModalFiltersTransaction({ isShow, onClose }: ModalFiltersTransactionProps) {



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShow}
      statusBarTranslucent={true}>
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ButtonBack onPress={onClose} />
            <Text style={styles.title}>Filtros de Lançamentos</Text>
            <Spacer />
          </ModalHeader>
          <View>
            <PickerWithTopLabel />
          </View>
          <ModalFooter>
            <ButtonIconAction iconName='close' onPress={onClose} />
            <ButtonIconAction iconName='checkmark-sharp' onPress={() => { }} />
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}