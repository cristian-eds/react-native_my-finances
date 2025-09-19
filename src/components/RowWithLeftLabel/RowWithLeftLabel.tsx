import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from './RowWithLeftLabelStyles';
import { FieldError } from 'react-hook-form';

interface RowWithLeftLabelProps {
  labelText: string;
  required?: boolean;
  errors?: FieldError | undefined;
  children: ReactNode

}

export function RowWithLeftLabel({labelText, required, errors, children}: RowWithLeftLabelProps) {

  return (
    <View style={styles.container}>
            <Text style={styles.text_label}>{`${labelText}${required ? "*":""}`+":"} </Text>
            {children}
            {errors && <Text style={styles.error_message}>{errors.message}</Text>}
        </View>
  );
}