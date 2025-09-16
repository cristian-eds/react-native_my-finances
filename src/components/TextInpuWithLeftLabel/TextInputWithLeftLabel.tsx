import React from 'react';
import { Text, TextInput, View } from 'react-native';

import { styles } from './TextInputWithLeftLabelStyles';

interface TextInputWithLeftLabelProps {
  name: string;
  placeholder: string;
  required?: boolean;
}

export function TextInpuWithLeftLabel({name, placeholder, required = false}: TextInputWithLeftLabelProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.text_label}>{`${name}${required ? "*":""}`+":"} </Text>
        <TextInput placeholder={placeholder} style={styles.input}/>
    </View>
  );
}