import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './RowWithTopLabelStyles';

interface RowWithTopLabelProps {
    title: string,
    onPress?: () => void,
    required?: boolean,
    children: React.ReactNode
}

export function RowWithTopLabel({title, children, onPress, required = false}: RowWithTopLabelProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{title}{required && '*'}:</Text>
        <TouchableOpacity style={styles.input} onPress={onPress}>
            {children}
        </TouchableOpacity>
    </View>
  );
}