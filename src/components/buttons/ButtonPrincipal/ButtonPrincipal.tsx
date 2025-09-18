import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { styles } from './ButtonPrincipalStyles';

interface ButtonPrincipalProps {
    title: string;
    loading?: boolean
}

type Props = ButtonPrincipalProps & TouchableOpacityProps;

export function ButtonPrincipal({ title = 'Entrar', loading = false,style, ...props }: Props) {
  return (
    <TouchableOpacity style={[styles.container_button, style]} {...props} disabled={loading}>
        <Text style={styles.text_button}>{title}</Text>
        {loading && <ActivityIndicator size={15}/>}
    </TouchableOpacity>
  );
}