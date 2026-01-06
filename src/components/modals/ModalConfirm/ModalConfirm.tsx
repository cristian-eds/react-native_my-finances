import React from 'react';

import { styles } from './ModalConfirmStyles';
import { Modal, View } from 'react-native';
import { Text } from 'react-native';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalConfirmProps {
    isShow: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string
}

export function ModalConfirm({ isShow, onClose, onConfirm, title }: ModalConfirmProps) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.container_content}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.buttons}>
                        <ButtonIconAction iconName='close' onPress={onClose}/>
                        <ButtonIconAction onPress={onConfirm}  mode={Mode.CONFIRM} />
                    </View>
                </View>

            </View>
        </Modal>
    );
}