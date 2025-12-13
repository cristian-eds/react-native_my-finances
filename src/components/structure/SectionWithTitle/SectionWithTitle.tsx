import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

import { styles } from './SectionWithTitleStyles';

interface SectionWithTitleProps {
    title: string,
    children: React.ReactNode,
    containerStyle?: StyleProp<ViewStyle>,
    titleStyle?: StyleProp<TextStyle>
}

export function SectionWithTitle({title, containerStyle, titleStyle, children} : SectionWithTitleProps) {
    return (
        <View style={[styles.section,containerStyle]}>
            <Text style={[styles.title,titleStyle]}>{title}</Text>
            {children}
        </View>
    );
}