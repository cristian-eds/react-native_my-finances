import React, { ReactNode } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { styles } from './RowWithLeftLabelStyles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface RowWithLeftLabelProps {
  labelText: string;
  required?: boolean;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> |undefined;
  children: ReactNode,
  containerStyles?: StyleProp<ViewStyle>;
}


export function RowWithLeftLabel({labelText, required, errors, containerStyles, children}: RowWithLeftLabelProps) {

  return (
    <View style={[styles.container, containerStyles]}>
            <Text style={styles.text_label}>{`${labelText}${required ? "*":""}`+":"} </Text>
            {children}
            {errors && <Text style={styles.error_message}>{errors.message}</Text>}
        </View>
  );
}