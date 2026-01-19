import React from 'react';
import { TouchableOpacity } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ButtonIconActionStyles';

export enum Mode {
  CONFIRM = 'CONFIRM',
  DEFAULT = 'DEFAULT',
  DISABLED = 'DISABLED'
}

const MODE_STYLES = {
  [Mode.CONFIRM]: {
    backgroundColor: '#35c925ff',
    color: '#fff'
  },
  [Mode.DEFAULT]: {
    backgroundColor: '#f0f0f0', 
    color: '#000'
  },
  [Mode.DISABLED]: {
    backgroundColor: '#dfdfdf', 
    color: '#989898'
  }
};

interface ButtonIconActionProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  mode?: Mode;
}

export function ButtonIconAction({ iconName = "checkmark", onPress, mode = Mode.DEFAULT }: ButtonIconActionProps) {
  const { backgroundColor, color } = MODE_STYLES[mode];
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} onPress={onPress} disabled={mode === Mode.DISABLED}>
      <Ionicons name={iconName} size={30} color={color} />
    </TouchableOpacity>
  );
}