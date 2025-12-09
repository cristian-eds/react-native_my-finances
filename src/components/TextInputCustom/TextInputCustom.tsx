import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './TextInputCustomStyles';
import { FieldError, useController } from 'react-hook-form';

interface TextInputCustomProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  control: any;
  name: any;
  errors?: FieldError | undefined;
}

type Props = TextInputProps & TextInputCustomProps;

export function TextInputCustom({ iconName, control, name, errors, ...props}: Props) {

  const {field} = useController({
    name,
    control,
    defaultValue: ''
  })

  const [showPassword, setShowPassword] = useState(!props.secureTextEntry);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={[styles.container, isFocus ? styles.focus : '']}>
      {iconName && <Ionicons name={iconName} size={20} color="black" />}  
      <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry={!showPassword} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}/>
      {props.secureTextEntry && <Ionicons name={showPassword ? "eye-off-outline": "eye-outline"} size={24} color="black" onPress={handleShowPassword}/>}
      {errors && <Text style={styles.error_message}>{errors.message}</Text>}
    </View>
  );
}