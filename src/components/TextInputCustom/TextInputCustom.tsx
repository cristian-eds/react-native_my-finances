import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './TextInputCustomStyles';
import { FieldError, FieldPath, useController } from 'react-hook-form';

interface TextInputCustomProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <View style={styles.container}>
      {iconName && <MaterialIcons name={iconName} size={24} color="black" />}  
      <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} secureTextEntry={!showPassword}/>
      {props.secureTextEntry && <MaterialIcons name={showPassword ? "visibility-off": "visibility"} size={24} color="black" onPress={handleShowPassword}/>}
      {errors && <Text style={styles.error_message}>{errors.message}</Text>}
    </View>
  );
}