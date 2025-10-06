import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './ButtonPlusStyles';

import Ionicons from '@expo/vector-icons/Ionicons';

type Props = TouchableOpacityProps

export function ButtonPlus({...props}: Props) {
  return (
    <TouchableOpacity {...props} style={styles.container} >
        <Ionicons name="add" size={28} color="black" />
    </TouchableOpacity>
  );
}
