import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './DividerTextMiddleStyles';

export function DividerTextMiddle() {
  return (
    <View style={styles.container}>
        <View style={styles.line}></View>
        <Text style={styles.text}>Já possui conta?</Text>
        <View style={styles.line}></View>
    </View>
  );
}