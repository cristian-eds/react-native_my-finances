import React from 'react';
import { Modal, View } from 'react-native';

import { styles } from './ModalNotificationStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { Spacer } from '../../Spacer/Spacer';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalNotificationProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalNotification({ isShow, onClose }: ModalNotificationProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={onClose} />
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="newspaper-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Notificações</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}