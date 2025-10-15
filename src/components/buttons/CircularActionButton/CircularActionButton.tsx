import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './CircularActionButtonStyles';

export function CircularActionButton({style,...props}: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={[styles.container,style]} {...props}>
        <Ionicons name="add" size={30} color="white" />
    </TouchableOpacity>
  );
}