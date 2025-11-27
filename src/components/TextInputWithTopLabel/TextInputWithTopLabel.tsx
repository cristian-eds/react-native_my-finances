import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { styles } from './TextInputWithTopLabelStyles';
import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';

interface TextInputWithLeftLabelProps {
    name: string;
    title: string,
    control: any,
    required?: boolean;
    showLabel?: boolean,
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInputWithTopLabel({ name, title, control, showLabel = true,required = false, errors, ...props }: Props) {

    const { field } = useController({
        name,
        control
    })

    return (
        <RowWithTopLabel title={title} required={required} errors={errors} showLabel={showLabel} value={field.value}>
            <TextInput {...props} value={field.value} onChangeText={field.onChange} placeholderTextColor='#090909e8' style={{padding: 4, flex: 1}}/>
        </RowWithTopLabel>
    );
}