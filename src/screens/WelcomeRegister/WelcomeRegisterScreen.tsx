import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './WelcomeRegisterScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';

export function WelcomeRegisterScreen() {
    return (
        <View style={globalStyles.container_screens_auth}>
            <View style={globalStyles.container_header_auth}>
                <Text style={globalStyles.title_screens_auth}>Olá,</Text>
                <Text style={globalStyles.title_screens_auth}>Bem vindo</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>
                        Seja bem vindo, esperamos que tenha experiência agrádavel e 
                        consigamos lhe ajudar em seu controle financeiro.
                    </Text>
                </View>
                <View>
                    <ButtonPrincipal title='Concluir'/>
                </View>
            </View>
        </View>
    );
}