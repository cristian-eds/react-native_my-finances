import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './PerfilScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles'
import { useUserContext } from '../../hooks/useUserContext';
import { Row } from '../../components/structure/Row/Row';

import Ionicons from '@expo/vector-icons/Ionicons';
import { ModalChangePassword } from '../../components/modals/ModalChangePassword/ModalChangePassword';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { SectionItemLink } from '../../components/SectionItemLink/SectionItemLink';
import { ModalChangeUserData } from '../../components/modals/ModalChangeUserData/ModalChangeUserData';
import { ButtonBackHome } from '../../components/buttons/ButtonBackHome/ButtonBackHome';
import { ModalConfirm } from '../../components/modals/ModalConfirm/ModalConfirm';
import { deleteUserCascade } from '../../services/userService';
import { useSQLiteContext } from 'expo-sqlite';

export function PerfilScreen() {

    const { user, logout } = useUserContext();
    const database = useSQLiteContext();

    const [showModalChangePassword, setShowModalChangePassword] = useState<boolean>(false);
    const [showModalChangeUserData, setShowModalChangeUserData] = useState<boolean>(false);
    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState<boolean>(false);

    const handleDeleteUser = async () => {
        const deleted = await deleteUserCascade(user?.id as number, database);
        if(deleted) logout();
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user?.name[0].toUpperCase()}</Text>
                </View>
                <Text style={styles.avatarText}>{user?.name}</Text>
                <Text style={styles.avatarSubText}>Membro desde 2025</Text>
            </View>
            <View style={{ flex: 1 }}>
                <SectionWithTitle title='Minha Conta'>
                    <SectionItemLink iconName='person-outline' text='Dados Pessoais' subText='Nome, CPF' onPress={() => setShowModalChangeUserData(true)} />
                </SectionWithTitle>
                <SectionWithTitle title='Segurança'>
                    <SectionItemLink iconName='lock-closed-outline' text='Senha' subText='Alterar Senha' onPress={() => setShowModalChangePassword(true)} />
                    <SectionItemLink iconName='trash-outline' text='Conta' subText='Excluir conta' onPress={() => setShowModalDeleteAccount(true)} />
                </SectionWithTitle>

                <ButtonBackHome />

            </View>
            <TouchableOpacity style={styles.buttonExit} onPress={logout}>
                <Row style={{ justifyContent: 'center', columnGap: 10 }}>
                    <Ionicons name="exit-outline" size={24} color="white" />
                    <Text style={{ fontSize: 16, color: '#fff' }}>Sair da conta</Text>
                </Row>
            </TouchableOpacity>
            {showModalChangePassword && <ModalChangePassword isShow={showModalChangePassword} onClose={() => setShowModalChangePassword(false)} />}
            {showModalChangeUserData && <ModalChangeUserData isShow={showModalChangeUserData} onClose={() => setShowModalChangeUserData(false)} />}
            {showModalDeleteAccount && <ModalConfirm 
                isShow={showModalDeleteAccount} 
                onClose={() => setShowModalDeleteAccount(false)} 
                title='Deseja realmente excluir a conta e seus dados?' 
                text='Essa ação é irreversível...'
                secondsToAbilityConfirm={5000}
                onConfirm={handleDeleteUser}
                /> }
        </View>
    );
}