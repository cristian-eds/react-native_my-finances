import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './HomeScreenStyles';

export function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}