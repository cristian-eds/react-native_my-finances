import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { styles } from './TextInputWithLeftLabelStyles';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { RowWithLeftLabel } from '../RowWithLeftLabel/RowWithLeftLabel';
import { TypeAccount } from '../../domain/typeAccountEnum';

interface TextInputWithLeftLabelProps {
  name: string;
  title: string,
  control: any,
  required?: boolean;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
  defaultValueProp?: string | number;
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInpuWithLeftLabel({ name, title, control, required = false, errors,defaultValueProp, ...props }: Props) {

  const { field } = useController({
    name,
    control,
    defaultValue: defaultValueProp || ' ',
  })


  return (
    <RowWithLeftLabel labelText={title} errors={errors} required={required}>
      <TextInput {...props} style={styles.input} value={field.value} onChangeText={field.onChange} placeholderTextColor='#090909e8'/>
    </RowWithLeftLabel>
  );
}