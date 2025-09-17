import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './TextInputCustomStyles';

interface TextInputCustomProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

type Props = TextInputProps & TextInputCustomProps;

export function TextInputCustom({ iconName, ...props}: Props) {
  return (
    <View style={styles.container}>
      {iconName && <MaterialIcons name={iconName} size={24} color="black" />}  
      <TextInput {...props} style={styles.input} />
    </View>
  );
}