import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './SectionItemLinkStyles';
import { Row } from '../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';

interface SectionItemLinkProps {
    text: string,
    subText: string,
    iconName: keyof typeof Ionicons.glyphMap,
    onPress?: () => void
}

export function SectionItemLink({iconName, text, subText, onPress}: SectionItemLinkProps) {
  return (
    <TouchableOpacity onPress={onPress}>
            <Row style={{ elevation: 2 }}>
                <Row>
                    <Ionicons name={iconName} size={20} color="black" />
                    <View>
                        <Text style={styles.sectionItemText}>{text}</Text>
                        <Text style={styles.sectionItemSubText}>{subText}</Text>
                    </View>
                </Row>
                <Ionicons name="chevron-forward" size={22} color="gray" />
            </Row>
        </TouchableOpacity>
  );
}