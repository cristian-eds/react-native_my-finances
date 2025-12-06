import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { Ionicons } from '@expo/vector-icons';

interface TextInputWithLeftLabelProps {
    name: string;
    title: string,
    control: any,
    required?: boolean;
    showLabel?: boolean,
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
    secureText?: boolean
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInputWithTopLabel({ name, title, control, showLabel = true,required = false, errors, secureText = false, ...props }: Props) {

    const { field } = useController({
        name,
        control
    })

    const [showSecureText, setShowSecureText] = useState(secureText);

    return (
        <RowWithTopLabel title={title} required={required} errors={errors} showLabel={showLabel} value={field.value}>
            <TextInput {...props} value={field.value} onChangeText={field.onChange} placeholderTextColor='#090909e8' style={{padding: 4, flex: 1}} secureTextEntry={showSecureText}/>
            {secureText && <Ionicons name={showSecureText ? 'eye-outline': 'eye-off-outline'} size={22} onPress={() => setShowSecureText(!showSecureText)}/>}
        </RowWithTopLabel>
    );
}