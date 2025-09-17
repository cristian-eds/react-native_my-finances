import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './DividerTextMiddleStyles';

interface DividerTextMiddleProps {
  text: string;
} 

export function DividerTextMiddle({text}: DividerTextMiddleProps) {
  return (
    <View style={styles.container}>
        <View style={styles.line}></View>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line}></View>
    </View>
  );
}