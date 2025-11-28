import React from 'react';
import { Modal, View } from 'react-native';

import { styles } from './ModalInstallmentsStyles';
import { Row } from '../structure/Row/Row';
import { Text } from 'react-native';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../Spacer/Spacer';

interface InstallmentProps {
    isShow?: boolean;
    onClose: () => void;
    items: {
        sequencyItem: number;
        dueDate: Date;
        value: number;
        description: string;
    }[];
}

export function ModalInstallments({ items, isShow, onClose }: InstallmentProps) {
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
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="calendar-clear-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Parcelas</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <Row key={0}>
                        <Text>#</Text>
                        <Text>Descrição</Text>
                        <Text>Vencimento</Text>
                        <Text>Valor</Text>
                    </Row>
                    {
                        items.map(item => (
                            <Row key={item.sequencyItem} style={styles.installmentItem}>
                                <Text>{item.sequencyItem}</Text>
                                <Text>{item.description}</Text>
                                <Text>{item.dueDate.toLocaleDateString()}</Text>
                                <Text>{item.value.toFixed(2)}</Text>
                            </Row>
                        ))
                    }
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}