import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';

import { styles } from './ModalSelectPeriodStyles';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import {  DatePickerWithTopLabel} from '../../DatePickerWithTopLabel/DatePickerWithTopLabel';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { periodDatesSchemas } from '../../../schemas/periodDatesSchemas';

interface ModalSelectPeriodProps {
    isShow: boolean,
    onClose: () => void,
    handleSetPeriodDates: (initialDate: Date, finalDate: Date) => void,
    handleConfirmValue: () => void;
}

export function ModalSelectPeriod({ isShow, onClose, handleSetPeriodDates, handleConfirmValue }: ModalSelectPeriodProps) {

    const { control, handleSubmit, watch, formState: { errors }, reset } = useForm({
            resolver: zodResolver(periodDatesSchemas),
            defaultValues: {
                initialDate: new Date(),
                finalDate: new Date()
            }
        });

    const handleConfirm = () => {
        const formValues = watch();
        handleSetPeriodDates(formValues.initialDate as Date, formValues.finalDate as Date);
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
                    <DatePickerWithTopLabel control={control} name='initialDate' title='Data inicial:'  />
                    <DatePickerWithTopLabel control={control} name='finalDate' title='Data final:' />
                    <View style={styles.buttons_footer}>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirm)} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}