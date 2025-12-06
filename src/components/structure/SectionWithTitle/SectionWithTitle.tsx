import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './SectionWithTitleStyles';

interface SectionWithTitleProps {
    title: string,
    children: React.ReactNode
}

export function SectionWithTitle({title, children} : SectionWithTitleProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    );
}