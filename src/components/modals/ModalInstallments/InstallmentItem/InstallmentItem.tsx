import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './InstallmentItemStyles';
import { Item } from '../ModalInstallments';
import { Row } from '../../structure/Row/Row';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { installmentsItemSchemas } from '../../../../utils/schemas/installmentItemSchemas';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TouchableOpacity } from 'react-native';
import { findTransactionsByDuplicateId } from '../../../../services/transactionService';
import { useSQLiteContext } from 'expo-sqlite';
import { DuplicateModel } from '../../../../domain/duplicateModel';
import { Transaction } from '../../../../domain/transactionModel';
import { Ionicons } from '@expo/vector-icons';

interface InstallmentItemProps {
    item: Item,
    updateItem: (item: Item) => void,
    readonly?: boolean,
}

export function InstallmentItem({ item, updateItem, readonly = false }: InstallmentItemProps) {

    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [payments, setPayments] = useState<Transaction[]>([]);

    const database = useSQLiteContext();

    const { control, handleSubmit, watch, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(installmentsItemSchemas),
        defaultValues: item,
    });

    const overdue = new Date() > new Date(item.dueDate as Date);
    const payed = payments.length > 0 && payments.reduce((prev, current) => prev += current.value, 0) >= item.value;

    useEffect(() => {
        const fetchPayments = async () => {
            const pays = await findTransactionsByDuplicateId(item.id.toLocaleString(), database);
            pays && setPayments(pays);
        }
        fetchPayments()
        return () => { };
    }, [watch]);

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
                        <TextInput
                            value={description}
                            onChangeText={async (e) => {
                                onChange(e);
                                await trigger('description');
                                propagateChanges();
                            }}
                            style={[styles.input, { flex: 2 }]}
                            readOnly={readonly} />
                    )}
                />
                <Controller
                    control={control}
                    name='dueDate'
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TouchableOpacity style={[styles.input, { flex: 2 }]} onPress={() => setShowPicker(true)}
                            disabled={readonly}>
                            <Text style={overdue ? { color: 'red' } : ''}>{new Date(value as Date).toLocaleDateString()}</Text>
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
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Controller
                        control={control}
                        name="value"
                        render={({ field: { onChange, onBlur, value: valueInstallment } }) => (
                            <TextInput value={Number(valueInstallment).toLocaleString()} onChangeText={async (e) => {
                                onChange(e);
                                await trigger('value');
                                propagateChanges();
                            }} style={[styles.input, { flex: 1, textAlign: 'right' }, payed ? { textDecorationLine: 'line-through', color: 'green' } : {}]}
                                keyboardType="numeric"
                                readOnly={readonly} />
                        )}
                    />
                    {payed && <Ionicons name="checkmark-circle" size={15} color="green" />}
                </View>

            </Row>

            {renderErrors()}
        </View>
    );
}