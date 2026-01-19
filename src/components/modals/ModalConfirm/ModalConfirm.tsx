import React, { useEffect, useState } from 'react';

import { styles } from './ModalConfirmStyles';
import { Modal, View } from 'react-native';
import { Text } from 'react-native';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalConfirmProps {
    isShow: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string,
    text?: string,
    secondsToAbilityConfirm?: number
}

export function ModalConfirm({ isShow, onClose, onConfirm, title, text, secondsToAbilityConfirm }: ModalConfirmProps) {

    const [mode, setMode] = useState<Mode>(secondsToAbilityConfirm ? Mode.DISABLED : Mode.CONFIRM);

    useEffect(() => {
        if(!secondsToAbilityConfirm) return;

        const timer = setTimeout(() => { 
            setMode(Mode.CONFIRM)
        }, secondsToAbilityConfirm);

        return () => clearTimeout(timer);
    }, [secondsToAbilityConfirm])


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
                    {text && <Text style={styles.text}>{text}</Text>}
                    <View style={styles.buttons}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction onPress={onConfirm} mode={mode} />
                    </View>
                </View>

            </View>
        </Modal>
    );
}