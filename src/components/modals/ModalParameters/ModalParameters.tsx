import React from 'react';
import { Modal, Text, View } from 'react-native';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { ModalContent } from '../structure/ModalContent/ModalContent';

import { styles } from './ModalParametersStyles';
import { Spacer } from '../../Spacer/Spacer';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useAccountStore } from '../../../stores/AccountStore';
import { useCategoryStore } from '../../../stores/CategoryStore';

interface ModalParametersProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalParameters({ isShow, onClose }: ModalParametersProps) {

    const {} = useAccountStore();
    const {} = useCategoryStore();

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
                            <Ionicons name="options-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.headerTitle}>Parâmetros</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={{ rowGap: 20, marginTop: 5}}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Contas padrão</Text>
                            <Row style={styles.item}>
                                <Text style={styles.itemText}>Tela Home:</Text>
                                
                            </Row>
                            <Row style={styles.item}>
                                <Text style={styles.itemText}>Para Transações:</Text>
                            </Row>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Categorias padrão</Text>
                            <Row style={styles.item}>
                                <Text style={styles.itemText}>Para Saídas:</Text>
                            </Row>
                            <Row style={styles.item}>
                                <Text style={styles.itemText}>Para Entradas:</Text>
                            </Row>
                            <Row style={styles.item}>
                                <Text style={styles.itemText}>Para Transferências:</Text>
                            </Row>
                        </View>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={() => { }} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}