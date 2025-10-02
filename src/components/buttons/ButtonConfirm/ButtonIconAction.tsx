import React from 'react';
import { TouchableOpacity } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './ButtonIconActionStyles';

interface ButtonIconActionProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  onPress?: () => void;
}

export function ButtonIconAction({ iconName = "check", onPress }: ButtonIconActionProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialIcons name={iconName} size={30} color="black" />
    </TouchableOpacity>
  );
}