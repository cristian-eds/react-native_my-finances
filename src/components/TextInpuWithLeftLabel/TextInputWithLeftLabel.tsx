import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { RowWithLeftLabel } from '../RowWithLeftLabel/RowWithLeftLabel';

import { styles } from './TextInputWithLeftLabelStyles';

interface TextInputWithLeftLabelProps {
  name: string;
  title: string,
  control: any,
  required?: boolean;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInpuWithLeftLabel({ name, title, control, required = false, errors, ...props }: Props) {

  const { field } = useController({
    name,
    control
  })


  return (
    <RowWithLeftLabel labelText={title} errors={errors} required={required}>
      <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} placeholderTextColor='#090909e8'/>
    </RowWithLeftLabel>
  );
}