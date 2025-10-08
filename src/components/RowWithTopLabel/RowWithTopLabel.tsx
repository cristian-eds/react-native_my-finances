import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { styles } from './RowWithTopLabelStyles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface RowWithTopLabelProps {
    title: string,
    onPress?: () => void,
    required?: boolean,
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> |undefined;
    children: React.ReactNode,
    stylesProp?: ViewStyle
}

export function RowWithTopLabel({title, children, onPress, required = false, errors, stylesProp}: RowWithTopLabelProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{title}{required && '*'}:</Text>
        <TouchableOpacity style={[styles.input, stylesProp]} onPress={onPress}>
            {children}
        </TouchableOpacity>
         {errors && <Text style={styles.error_message}>{errors.message}</Text>}
    </View>
  );
}