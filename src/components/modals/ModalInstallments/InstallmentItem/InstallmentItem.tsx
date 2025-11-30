import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './InstallmentItemStyles';
import { Item } from '../ModalInstallments';
import { Row } from '../../structure/Row/Row';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { installmentsItemSchemas } from '../../../../utils/schemas/installmentItemSchemas';

interface InstallmentItemProps {
    item: Item,
    updateItem: (item: Item) => void,
}

export function InstallmentItem({ item, updateItem }: InstallmentItemProps) {

    const { control, handleSubmit, watch, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(installmentsItemSchemas),
        defaultValues: item,
    });


    function propagateChanges() {

        if (errors) return;

        const updated = watch();

        //updateItem({
        //   ...item,
        //    ...updated,
        //});

        console.log({
            ...item,
            ...updated,
        })
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
                    }} style={styles.input} />
                )}
            />
            <Text>{item.dueDate.toLocaleDateString()}</Text>
            <Text>{item.value.toFixed(2)}</Text>
        </Row>
        {renderErrors()}
    </View>
    );
}