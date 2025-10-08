import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './RowWithTopLabelStyles';

interface RowWithTopLabelProps {
    title: string,
    onPress: () => void,
    children: React.ReactNode
}

export function RowWithTopLabel({title, children, onPress}: RowWithTopLabelProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>{title}</Text>
        <TouchableOpacity style={styles.input} onPress={onPress}>
            {children}
        </TouchableOpacity>
    </View>
  );
}