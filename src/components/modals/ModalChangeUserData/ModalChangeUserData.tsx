import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import { styles } from './ModalChangeUserDataStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../Spacer/Spacer';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeUserDataSchemas } from '../../../utils/schemas/changeUserDataSchemas';
import { useUserContext } from '../../../hooks/useUserContext';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { updateUser } from '../../../services/userService';
import { useSQLiteContext } from 'expo-sqlite';

interface Props {
    isShow: boolean,
    onClose: () => void
}

export function ModalChangeUserData({ isShow, onClose }: Props) {

    const { user, handleSetUser } = useUserContext();
    const databse = useSQLiteContext();

    const { control, formState: { errors }, handleSubmit, watch } = useForm({
        resolver: zodResolver(changeUserDataSchemas),
        defaultValues: {
            cpf: user?.cpf as string,
            name: user?.name as string
        }
    });

    const handleConfirm = async () => {
        const fieldsData = watch();
        const newUser = {
            id: user?.id as number,
            cpf: fieldsData.cpf,
            name: fieldsData.name
        }

        const updated = await updateUser(newUser, databse);

        if(updated) {
            Alert.alert('Sucesso!', 'Dados foram atualizados!')
            handleSetUser(newUser);
            onClose();
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={onClose} />
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="newspaper-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Alterar dados</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={{ rowGap: 15 }}>
                        <TextInputWithTopLabel
                            control={control}
                            name='name'
                            title='Nome: '
                            showLabel={true}
                            required={true}
                            placeholder='Nome: '
                            errors={errors.name}
                        />
                        <TextInputWithTopLabel
                            control={control}
                            name='cpf'
                            title='CPF: '
                            showLabel={true}
                            required={true}
                            placeholder='CPF: '
                            errors={errors.cpf}
                            keyboardType='numeric'
                        />

                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirm)}/>
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}