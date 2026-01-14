import React from 'react';
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './ButtonPrincipalStyles';
import { Ionicons } from '@expo/vector-icons';

interface ButtonPrincipalProps {
  title: string;
  loading?: boolean,
  iconName?: keyof typeof Ionicons.glyphMap,
  mode?: 'default' | 'confirm',
  textStyle?: TextStyle
}

type Props = ButtonPrincipalProps & TouchableOpacityProps;

export function ButtonPrincipal({ title = 'Entrar', loading = false, textStyle, style, iconName, mode, ...props }: Props) {
  return (
    <TouchableOpacity style={[styles.container_button, style, mode === 'confirm' && styles.containerButtonConfirm]} {...props} disabled={loading}>
      {iconName && <Ionicons name={iconName} size={20} color="#001a02ff" style={{ marginRight: 3 }} />}
      <Text style={[styles.text_button, textStyle, mode === 'confirm' && styles.textButtonConfirm]}>{title}</Text>
      {loading && <ActivityIndicator size={15} />}
    </TouchableOpacity>
  );
}