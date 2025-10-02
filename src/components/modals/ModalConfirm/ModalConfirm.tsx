import React from 'react';

import { styles } from './ModalConfirmStyles';
import { Modal, View } from 'react-native';
import { Text } from 'react-native';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalConfirmProps {
    isShow: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

export function ModalConfirm({ isShow, onClose, onConfirm }: ModalConfirmProps) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <Text style={styles.title}>Confirma a exclusão da conta?</Text>
                    <View style={styles.buttons}>
                        <ButtonIconAction iconName='close' onPress={onClose}/>
                        <ButtonIconAction onPress={onConfirm}/>
                    </View>
                </View>

            </View>
        </Modal>
    );
}