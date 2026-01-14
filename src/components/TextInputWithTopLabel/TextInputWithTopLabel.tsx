import React, { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { FieldError, FieldErrorsImpl, Merge, useController } from 'react-hook-form';
import { RowWithTopLabel } from '../RowWithTopLabel/RowWithTopLabel';
import { Ionicons } from '@expo/vector-icons';
import MaskInput, { Mask, Masks } from 'react-native-mask-input';

export type MaskType = keyof typeof Masks;


interface TextInputWithLeftLabelProps {
    name: string;
    title: string,
    control: any,
    required?: boolean;
    showLabel?: boolean,
    errors?: FieldError | Merge<FieldError, FieldErrorsImpl<{}>> | undefined;
    secureText?: boolean;
    iconName?: keyof typeof Ionicons.glyphMap;
    mask?: MaskType
}

type Props = TextInputWithLeftLabelProps & TextInputProps;

export function TextInputWithTopLabel({ name, title, control, showLabel = true, required = false, errors, secureText = false, mask, iconName, ...props }: Props) {

    const { field } = useController({
        name,
        control
    })

    const [showSecureText, setShowSecureText] = useState(secureText);

    return (
        <RowWithTopLabel title={title} required={required} errors={errors} showLabel={showLabel} value={field.value}>
            {iconName && <Ionicons name={iconName} size={20} />}
            <MaskInput {...props} mask={mask? Masks[mask] : undefined} value={field.value} onChangeText={(masked, unmasked) => field.onChange(unmasked)} placeholderTextColor='#090909e8' style={{ padding: 4, flex: 1, color: '#000' }} secureTextEntry={showSecureText} />
            {secureText && <Ionicons name={showSecureText ? 'eye-outline' : 'eye-off-outline'} size={20} onPress={() => setShowSecureText(!showSecureText)} />}
        </RowWithTopLabel>
    );
}