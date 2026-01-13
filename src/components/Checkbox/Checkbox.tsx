import React from 'react';
import { View } from 'react-native';

import { styles } from './CheckboxStyles';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CheckboxProps {
  checked?: boolean;
  onPress?: () => void;
  mode?: 'circle' | 'square';
}

export function Checkbox({ checked = false, onPress, mode = 'circle' }: CheckboxProps) {
  return (
    <TouchableOpacity style={[styles.container, mode === 'square' && styles.containerSquare, mode === 'square' && checked && styles.containerSquareCheck]} onPress={onPress}>
        {checked && mode === 'circle' && <View style={styles.indicator}></View>}
        {checked && mode === 'square' && <Ionicons name="checkmark-sharp" size={16} color="rgb(255, 255, 255)" />}
    </TouchableOpacity>
  );
}