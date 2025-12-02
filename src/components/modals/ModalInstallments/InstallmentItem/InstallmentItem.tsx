import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './InstallmentItemStyles';
import { Item } from '../ModalInstallments';
import { Row } from '../../structure/Row/Row';
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { installmentsItemSchemas } from '../../../../utils/schemas/installmentItemSchemas';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';

interface InstallmentItemProps {
    item: Item,
    updateItem: (item: Item) => void,
}

export function InstallmentItem({ item, updateItem }: InstallmentItemProps) {

    const [showPicker, setShowPicker] = useState<boolean>(false);

    const { control, handleSubmit, watch, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(installmentsItemSchemas),
        defaultValues: item,
    });


    function propagateChanges() {

        if (errors.description || errors.description || errors.value) return;

        const updated = watch();

        updateItem({
            ...item,
            dueDate: new Date(updated.dueDate as Date),
            description: updated.description,
            value: updated.value as number,
        });

    }

    const renderErrors = () => {
        if (errors.description) {
            return <Text style={styles.errorMessage}>{errors.description.message}</Text>
        }
        if (errors.dueDate) {
            return <Text style={styles.errorMessage}>{errors.dueDate.message}</Text>
        }
        if (errors.value) {
            return <Text style={styles.errorMessage}>{errors.value.message}</Text>
        }
        return null;
    }

    return (
        <View style={styles.installmentItem}>
            <Row key={item.sequencyItem} >
                <Text>{item.sequencyItem}</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value: description } }) => (
                        <TextInput value={description} onChangeText={async (e) => {
                            onChange(e);
                            await trigger('description');
                            propagateChanges();
                        }} style={[styles.input, { flex: 2 }]} />
                    )}
                />
                <Controller
                    control={control}
                    name='dueDate'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TouchableOpacity style={[styles.input, { flex: 2 }]} onPress={() => setShowPicker(true)}>
                            <Text>{new Date(value as Date).toLocaleDateString()}</Text>
                            <DateTimePickerModal
                                isVisible={showPicker}
                                mode={'date'}
                                onConfirm={(selectedDate: Date) => {
                                    onChange(selectedDate);
                                    setShowPicker(false);
                                    propagateChanges();
                                }}
                                onCancel={() => setShowPicker(false)}
                                date={value as Date}
                            />
                        </TouchableOpacity>

                    )}
                />

                <Controller
                    control={control}
                    name="value"
                    render={({ field: { onChange, onBlur, value: valueInstallment } }) => (
                        <TextInput value={Number(valueInstallment).toLocaleString()} onChangeText={async (e) => {
                            onChange(e);
                            await trigger('value');
                            propagateChanges();
                        }} style={[styles.input, { flex: 1, textAlign: 'right' }]}
                            keyboardType="numeric"
                        />
                    )}
                />
            </Row>

            {renderErrors()}
        </View>
    );
}