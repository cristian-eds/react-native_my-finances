import React from 'react';
import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ButtonIconActionStyles';

interface ButtonIconActionProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export function ButtonIconAction({ iconName = "checkmark", onPress }: ButtonIconActionProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Ionicons name={iconName} size={30} color="black" />
    </TouchableOpacity>
  );
}