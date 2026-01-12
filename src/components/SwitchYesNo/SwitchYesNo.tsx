import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './SwitchYesNoStyles';
import { Row } from '../structure/Row/Row';

interface SwitchYesNoProps {
    isActive: boolean,
    setIsActive: (value: boolean) => void
}

export function SwitchYesNo({ isActive, setIsActive }: SwitchYesNoProps) {

    return (
        <Row style={styles.container}>
            <TouchableOpacity style={[styles.itemSwitch, isActive && styles.itemSwitchActive]}  onPress={() => setIsActive(true)}>
                <Text style={[styles.itemText, isActive && styles.itemTextActive]}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemSwitch, !isActive && styles.itemSwitchActive]} onPress={() => setIsActive(false)}>
                <Text style={[styles.itemText, !isActive && styles.itemTextActive]}>Não</Text>
            </TouchableOpacity>
        </Row>
    );
}