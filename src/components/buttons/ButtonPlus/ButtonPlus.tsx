import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import { styles } from './ButtonPlusStyles';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type Props = TouchableOpacityProps

export function ButtonPlus({...props}: Props) {
  return (
    <TouchableOpacity {...props} style={styles.container} >
        <MaterialIcons name="add" size={28} color="black" />
    </TouchableOpacity>
  );
}
