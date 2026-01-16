import React from 'react';
import { Linking, Modal, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ModalContactUsStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../Spacer/Spacer';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useUserContext } from '../../../hooks/useUserContext';

interface ModalContactUsProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalContactUs({ isShow, onClose }: ModalContactUsProps) {

    const handleSendEmail = () => {
        const email = 'my-finances@gmail.com';
        const subject = 'Suporte';
        const body = ''
        Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
    }

    const handleRatting = () => {

    }

    const renderSendEmailButton = () => {
        return (
            <TouchableOpacity onPress={handleSendEmail}>
                <Row style={styles.sendEmailButton}>
                    <Ionicons name="mail-outline" size={24} color="green" />
                    <Text style={styles.textLink}>Enviar E-mail</Text>
                </Row>
            </TouchableOpacity>
        )
    }

    const renderRatingButton = () => {
        return (
            <TouchableOpacity onPress={handleRatting}>
                <Row style={styles.sendEmailButton}>
                    <Ionicons name="star-outline" size={24} color="green" />
                    <Text style={styles.textLink}>Avalie-nos</Text>
                </Row>
            </TouchableOpacity>
        )
    }

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
                            <Ionicons name="chatbox-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Contate-nos</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View>
                        <Text style={styles.textTitle}>Estamos aqui para ajudar!</Text>
                        <Text style={styles.textBody}>
                            Sua experiência é nossa prioridade.
                            Se você tiver alguma dúvida, encontrar um problema ou quiser sugerir uma nova funcionalidade
                            para melhorar seu controle financeiro, estamos prontos para ouvir.
                            Envie-nos um e-mail!
                        </Text>
                        <Text style={styles.textBody}>
                            ⭐ Avalie o nosso App:
                            Leve menos de 1 minuto para nos contar o que você está achando. Sua nota é muito importante para nós!
                        </Text>
                        <View style={{marginTop: 20}}>
                            {renderSendEmailButton()}
                            {renderRatingButton()}
                        </View>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='checkmark-sharp' onPress={onClose} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}