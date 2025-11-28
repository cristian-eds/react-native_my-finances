import React from 'react';
import { View } from 'react-native';

import { styles } from './CheckboxStyles';
import { TouchableOpacity } from 'react-native';

interface CheckboxProps {
  checked?: boolean;
  onPress?: () => void;
}

export function Checkbox({ checked = false, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        {checked && <View style={styles.indicator}></View>}
    </TouchableOpacity>
  );
}