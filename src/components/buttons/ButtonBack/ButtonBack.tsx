import React from 'react';

import { styles } from './ButtonBackStyles';
import { ButtonIconSimple } from '../ButtonIconSimple/ButtonIconSimple';

interface ButtonBack {
    onPress: () => void
}

export function ButtonBack({onPress}: ButtonBack ) {
    return (
        <ButtonIconSimple iconName='arrow-back' onPress={onPress} style={styles.buttonBack} />
    );
}