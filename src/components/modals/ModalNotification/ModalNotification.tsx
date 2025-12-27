import React, { useState } from 'react';
import { Alert, Modal, TouchableOpacity, View } from 'react-native';

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
import { useParameterStore } from '../../../stores/ParameterStore';
import { useSQLiteContext } from 'expo-sqlite';

interface ModalNotificationProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalNotification({ isShow, onClose }: ModalNotificationProps) {

    const { parameters, updateParameters } = useParameterStore();
    const database = useSQLiteContext();

    const [transactionNotificationEnabled, setTransactionNotificationEnabled] = useState<boolean>(parameters.enableTransactionNotify ?? true);
    const [duplicateNotificationEnabled, setDuplicateNotificationEnabled] = useState<boolean>(parameters.enableDuplicateNotify ?? true);
    const [reminderTime, setReminderTime] = useState<Date>(parameters.duplicateNotificationTime ?? new Date(new Date().setHours(9,0,0,0)));

    const [showModalDatePicker, setShowModalDatePicker] = useState(false);

    const handleSaveChanges = async () => {   
        const updatedParameters = {
            ...parameters,
            enableTransactionNotify: transactionNotificationEnabled,
            enableDuplicateNotify: duplicateNotificationEnabled,
            duplicateNotificationTime: reminderTime
        };

        const updated = await updateParameters(updatedParameters,database);

        if(updated){
            Alert.alert("Sucesso","Parâmetros atualizados com sucesso!");
            onClose();
        }
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
                            <Ionicons name="notifications-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Notificações</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={styles.body}>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Notificar Transação Realizada?</Text>
                            <SwitchYesNo isActive={transactionNotificationEnabled} setIsActive={setTransactionNotificationEnabled} />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Notificar Vencimento Conta?</Text>
                            <SwitchYesNo isActive={duplicateNotificationEnabled} setIsActive={setDuplicateNotificationEnabled} />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Horário notificação vencimento: </Text>
                            <TouchableOpacity  style={styles.itemValue} disabled={!duplicateNotificationEnabled} onPress={() => setShowModalDatePicker(true)}>
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
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSaveChanges}/>
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}