import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './TextInputWithLeftLabelStyles';
import { FieldError, useController } from 'react-hook-form';
import { RowWithLeftLabel } from '../RowWithLeftLabel/RowWithLeftLabel';

interface TextInputWithLeftLabelProps {
  name: string;
  title: string,
  control: any,
  required?: boolean;
  errors?: FieldError | undefined;
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInpuWithLeftLabel({ name, title, control, required = false, errors, ...props }: Props) {

  const { field } = useController({
    name,
    control,
    defaultValue: ''
  })

  return (
    <RowWithLeftLabel labelText={title} errors={errors} required={required}>
      <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} />
    </RowWithLeftLabel>
  );
}