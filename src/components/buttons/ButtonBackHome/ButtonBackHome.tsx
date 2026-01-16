import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './ButtonBackHomeStyles';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../../routes/Stack/types/PrincipalStackParamList';

export function ButtonBackHome() {

    const navigate = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

    const handleNavigateHome = () => navigate.goBack();

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigateHome}>
            <Row style={{ justifyContent: 'center' }}>
                <Ionicons name="home" size={22} color="#000620" />
                <Text style={styles.text}>Voltar para Inicio</Text>
            </Row>
        </TouchableOpacity>
    );
}