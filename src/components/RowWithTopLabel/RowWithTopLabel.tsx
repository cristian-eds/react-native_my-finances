import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { styles } from './RowWithTopLabelStyles';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { isValidProp } from '../../utils/validations';

interface RowWithTopLabelProps {
  title?: string,
  onPress?: () => void,
  required?: boolean,
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
  children: React.ReactNode,
  showLabel?: boolean,
  stylesProp?: ViewStyle,
  value?: any;
  zIndex?: number,
}

export function RowWithTopLabel({ title, children, onPress, required = false, errors, showLabel = false, stylesProp, value = true, zIndex = 10 }: RowWithTopLabelProps) {

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      {isValidProp(value) && <Text style={[styles.labelTopLine, { zIndex: zIndex + 1 }]}>{title}{required && '*'}:</Text>}
      <Wrapper style={[styles.input, stylesProp]} onPress={onPress}>
        {children}
      </Wrapper>
      {errors && <Text style={styles.error_message}>{errors.message}</Text>}
    </View>
  );
}