import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './SwitchYesNoStyles';
import { Row } from '../structure/Row/Row';

export function SwitchYesNo() {

    const [isActive, setIsActive] = useState<boolean>(true);

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