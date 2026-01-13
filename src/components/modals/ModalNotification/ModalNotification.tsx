import React, { useEffect, useRef, useState } from 'react';
import { Alert, AppState, Modal, TouchableOpacity, View } from 'react-native';
import { Linking, Platform } from 'react-native';

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
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { SwitchYesNo } from '../../SwitchYesNo/SwitchYesNo';
import { getHoursMinutesFromDate } from '../../../utils/DateFormater';
import { useParameterStore } from '../../../stores/ParameterStore';
import { useSQLiteContext } from 'expo-sqlite';
import { isNotificationsEnabled } from '../../../utils/notifications/NotificationsConfig';

interface ModalNotificationProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalNotification({ isShow, onClose }: ModalNotificationProps) {

    const { parameters, updateParameters } = useParameterStore();
    const database = useSQLiteContext();

    const [transactionNotificationEnabled, setTransactionNotificationEnabled] = useState<boolean>(parameters.enableTransactionNotify ?? true);
    const [duplicateNotificationEnabled, setDuplicateNotificationEnabled] = useState<boolean>(parameters.enableDuplicateNotify ?? true);
    const [reminderTime, setReminderTime] = useState<Date>(parameters.duplicateNotificationTime ?? new Date(new Date().setHours(9, 0, 0, 0)));

    const [showModalDatePicker, setShowModalDatePicker] = useState(false);

    const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] = useState<boolean>(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const checkNotificationPermission = async () => {
        const granted = await isNotificationsEnabled();
        setIsNotificationPermissionGranted(granted);
        console.log('Notification permission granted:', granted);
    };

    useEffect(() => {

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                checkNotificationPermission();
                console.log('App has come to the foreground!');

            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        checkNotificationPermission();

        return () => subscription.remove();
    }, []);

    const handleSaveChanges = async () => {
        const updatedParameters = {
            ...parameters,
            enableTransactionNotify: transactionNotificationEnabled,
            enableDuplicateNotify: duplicateNotificationEnabled,
            duplicateNotificationTime: reminderTime
        };

        const updated = await updateParameters(updatedParameters, database);

        if (updated) {
            Alert.alert("Sucesso", "Parâmetros atualizados com sucesso!");
            onClose();
        }
    }

    const handleOpenSettings = async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL('app-settings:');
        } else {
            await Linking.openSettings();
        }
    }

    const renderGetPermissionButton = () => {
        if (!isNotificationPermissionGranted) {
            return (
                <View style={styles.body}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                        <Ionicons name="alert-circle-outline" size={24} color="red" />
                        <View>
                            <Text style={{ color: '#f00e0e', fontSize: 12, fontWeight: 'bold' }}>Permissão para notificações negadas.</Text>
                            <Text style={{ fontSize: 14 }}>Toque para acessar as configurações e habilitar as notificações</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.requestPermissionsButton}
                        onPress={handleOpenSettings}>
                        <Text style={{ color: 'white' }}>Abrir Configurações</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    };

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
                            <SwitchYesNo isActive={transactionNotificationEnabled} setIsActive={setTransactionNotificationEnabled} disabled={!isNotificationPermissionGranted} />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Notificar Vencimento Conta?</Text>
                            <SwitchYesNo isActive={duplicateNotificationEnabled} setIsActive={setDuplicateNotificationEnabled} />
                        </Row>
                        <Row style={styles.item}>
                            <Text style={styles.itemText}>Horário notificação vencimento: </Text>
                            <TouchableOpacity style={styles.itemValue} disabled={!isNotificationPermissionGranted || !duplicateNotificationEnabled} onPress={() => setShowModalDatePicker(true)}>
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
                    {renderGetPermissionButton()}
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSaveChanges} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}