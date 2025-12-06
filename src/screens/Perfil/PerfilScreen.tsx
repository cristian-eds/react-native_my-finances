import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './PerfilScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { useUserContext } from '../../hooks/useUserContext';
import { Row } from '../../components/structure/Row/Row';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ModalChangePassword } from '../../components/modals/ModalChangePassword/ModalChangePassword';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';

export function PerfilScreen() {

    const { user, logout } = useUserContext();

    const [showModalChangePassword, setShowModalChangePassword] = useState<boolean>(false);

    const renderItemSection = (text: string, subText: string, iconName: keyof typeof Ionicons.glyphMap, onPress?: () => void) => (
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

    )

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.name[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.sectionItemText}>{user?.name}</Text>
                <Text style={styles.sectionItemSubText}>Membro desde 2025</Text>
            </View>
            <ScrollView >
                <SectionWithTitle title='Minha Conta'>
                    {renderItemSection('Dados Pessoais', 'Nome, CPF', 'person-outline')}
                    {renderItemSection('Segurança', 'Alterar Senha', 'lock-closed-outline', () => setShowModalChangePassword(true))}
                </SectionWithTitle>

                <SectionWithTitle title='Configurações'>
                    {renderItemSection('Parâmetros', 'Gerais, finanças, lançamentos', 'options-outline')}
                    {renderItemSection('Notificações', 'Gerais, finanças, lançamentos', 'notifications-outline')}
                </SectionWithTitle>

                <SectionWithTitle title='Suporte'>
                    {renderItemSection('Contato', 'Fale conosco', 'chatbox-outline')}
                    {renderItemSection('Sobre nós', 'Informações', 'information-circle-outline')}
                </SectionWithTitle>

            </ScrollView>
            <TouchableOpacity style={styles.buttonExit} onPress={logout}>
                <Row style={{ justifyContent: 'center', columnGap: 10 }}>
                    <Ionicons name="exit-outline" size={24} color="white" />
                    <Text style={{ fontSize: 16, color: '#fff' }}>Sair da conta</Text>
                </Row>
            </TouchableOpacity>
            {showModalChangePassword && <ModalChangePassword isShow={showModalChangePassword} onClose={() => setShowModalChangePassword(false)} />}
        </View>
    );
}