import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './ButtonPrincipalStyles';

interface ButtonPrincipalProps {
    title: string;
    style?: object;
    onPress?: () => void;
}

export function ButtonPrincipal({ title = 'Entrar', style, onPress }: ButtonPrincipalProps) {
  return (
    <TouchableOpacity style={[styles.container_button, style]} onPress={onPress}>
        <Text style={styles.text_button}>{title}</Text>
    </TouchableOpacity>
  );
}