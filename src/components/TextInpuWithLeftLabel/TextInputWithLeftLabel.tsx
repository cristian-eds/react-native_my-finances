import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './TextInputWithLeftLabelStyles';
import { FieldError, useController } from 'react-hook-form';

interface TextInputWithLeftLabelProps {
  name: string;
  title: string,
  control: any,
  required?: boolean;
  errors?: FieldError | undefined;
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInpuWithLeftLabel({name, title ,control, required = false, errors, ...props}: Props) {

  const {field} = useController({
    name,
    control,
    defaultValue: ''
  })

  return (
    <View style={styles.container}>
        <Text style={styles.text_label}>{`${title}${required ? "*":""}`+":"} </Text>
        <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} />
        {errors && <Text style={styles.error_message}>{errors.message}</Text>}
    </View>
  );
}