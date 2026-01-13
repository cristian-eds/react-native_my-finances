import React from 'react';

import { styles } from './ModalAboutStyles';

import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Spacer } from '../../Spacer/Spacer';
import { Ionicons } from '@expo/vector-icons';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useUserContext } from '../../../hooks/useUserContext';

interface ModalAboutProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalAbout({ isShow, onClose }: ModalAboutProps) {

    const { user } = useUserContext();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true} >
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={onClose} />
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="information-circle-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Sobre</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View>
                        <Text style={styles.textTitle}>Olá, {user?.name}!</Text>
                        <Text style={styles.textAbout}>Criamos o aplicativo com um propósito de ajudar você a organizar suas finanças pessoais de forma simples e eficiente.</Text>
                        <Text style={styles.textAbout}>Esperamos que tenha experiência agrádavel e consigamos lhe ajudar em seu controle financeiro!</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.buttonTerms} onPress={() => { }}>
                            <Ionicons name="newspaper-outline" size={16} color="#33911a" />
                            <Text style={styles.buttonTermsText}>Termos, política e privacidade</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.version}>Versão do App 1.0.0</Text>
                    <ModalFooter>
                        <ButtonIconAction iconName='checkmark-sharp' onPress={onClose} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>

        </Modal>
    );
}