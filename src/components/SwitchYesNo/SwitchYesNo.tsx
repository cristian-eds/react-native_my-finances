import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './SwitchYesNoStyles';
import { Row } from '../structure/Row/Row';

interface SwitchYesNoProps {
    isActive: boolean,
    setIsActive: (value: boolean) => void,
    disabled?: boolean
}

export function SwitchYesNo({ isActive, setIsActive, disabled }: SwitchYesNoProps) {

    return (
        <Row style={styles.container}>
            <TouchableOpacity style={[styles.itemSwitch, isActive && styles.itemSwitchActive]}  onPress={() => setIsActive(true)} disabled={disabled}>
                <Text style={[styles.itemText, isActive && styles.itemTextActive]}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.itemSwitch, !isActive && styles.itemSwitchActive]} onPress={() => setIsActive(false)} disabled={disabled}>
                <Text style={[styles.itemText, !isActive && styles.itemTextActive]}>Não</Text>
            </TouchableOpacity>
        </Row>
    );
}