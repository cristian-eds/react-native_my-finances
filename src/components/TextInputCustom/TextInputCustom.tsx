import React from 'react';
import { TextInput, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './TextInputCustomStyles';

interface TextInputCustomProps {
  placeholder: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
}

export function TextInputCustom({ placeholder, iconName, secureTextEntry = false, onChangeText }: TextInputCustomProps) {
  return (
    <View style={styles.container}>
      {iconName && <MaterialIcons name={iconName} size={24} color="black" />}  
      <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.input} />
    </View>
  );
}