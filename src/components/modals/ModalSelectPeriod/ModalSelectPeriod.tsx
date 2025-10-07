import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';

import { styles } from './ModalSelectPeriodStyles';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';

interface ModalSelectPeriodProps {
    isShow: boolean,
    onClose: () => void,
    handleSetPeriodDates: (initialDate: Date, finalDate: Date) => void,
    handleConfirmValue: () => void;
}

export function ModalSelectPeriod({ isShow, onClose, handleSetPeriodDates, handleConfirmValue }: ModalSelectPeriodProps) {

    const [initialDate, setInitialDate] = useState<Date>(new Date());
    const [finalDate, setFinalDate] = useState<Date>(new Date());

    const handleConfirm = () => {
        handleSetPeriodDates(initialDate, finalDate);
        handleConfirmValue();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <View style={styles.container}>
                <View style={styles.containerContent}>
                    <View style={styles.header}>
                        <ButtonBack onPress={onClose} />
                        <Text style={styles.title}>Escolha as datas</Text>
                        <View style={styles.rightSpacer}></View>
                    </View>
                    <PickerWithTopLabel date={initialDate} title='Data inicial:' setDate={setInitialDate} />
                    <PickerWithTopLabel date={finalDate} title='Data final:' setDate={setFinalDate} />
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}