import React from 'react';
import { View } from 'react-native';

import { styles } from './ButtonIconTabStyles';
import { MaterialIcons } from '@expo/vector-icons';

interface ButtonIconProps {
    focused: boolean,
    iconName: keyof typeof MaterialIcons.glyphMap
}


export function ButtonIconTab({focused, iconName}: ButtonIconProps) {
    return (
        <View style={[styles.icon_tab, focused && styles.border]}>
            <MaterialIcons name={iconName} size={focused ? 35 : 24} color="black" style={{top: -10} } />
        </View>
    );
}