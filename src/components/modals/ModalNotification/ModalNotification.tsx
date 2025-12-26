import React, { useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
import { SwitchYesNo } from '../../SwitchYesNo/SwitchYesNo';
import { getHoursMinutesFromDate } from '../../../utils/DateFormater';

interface ModalNotificationProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalNotification({ isShow, onClose }: ModalNotificationProps) {

    const [showModalDatePicker, setShowModalDatePicker] = useState(false);
    const [reminderTime, setReminderTime] = useState<Date>(new Date());

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
                            <Ionicons name="notifications-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Notificações</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={styles.body}>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Notificar Transação Realizada?</Text>
                            <SwitchYesNo />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Notificar Vencimento Conta?</Text>
                            <SwitchYesNo />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Horário notificação vencimento: </Text>
                            <TouchableOpacity onPress={() => setShowModalDatePicker(true)} style={styles.itemValue}>
                                <Row style={{ columnGap: 8 }}>
                                    <View >
                                        <Text>{getHoursMinutesFromDate(reminderTime)}</Text>
                                        <DateTimePickerModal
                                            isVisible={showModalDatePicker}
                                            mode={'time'}
                                            onConfirm={setReminderTime}
                                            onCancel={() => setShowModalDatePicker(false)}
                                            is24Hour={true}
                                        />
                                    </View>
                                    <Ionicons name="time-outline" size={14} color="#000" />
                                </Row>
                            </TouchableOpacity>
                        </Row>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}