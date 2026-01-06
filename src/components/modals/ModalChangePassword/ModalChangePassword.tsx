import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import { styles } from './ModalChangePasswordStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../Spacer/Spacer';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { useForm, Watch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchemas } from '../../../utils/schemas/changePasswordSchemas';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { updatePassword } from '../../../services/userService';
import { useUserContext } from '../../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';

interface ModalChangePasswordProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalChangePassword({ isShow, onClose }: ModalChangePasswordProps) {

    const {user} = useUserContext();
    const database = useSQLiteContext();

    const { control, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: zodResolver(changePasswordSchemas),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    })

    const handleConfirmChange = async () => {
        const values = watch();
        const changed = await updatePassword(values.password,values.newPassword, user?.id as number, database);
        if(changed) {
            Alert.alert("Sucesso!", "Senha atualizada.")
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
                            <Ionicons name="lock-closed-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Alterar senha</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={{ rowGap: 15 }}>
                        <TextInputWithTopLabel
                            control={control}
                            name='password'
                            title='Senha atual'
                            showLabel={true}
                            required={true}
                            placeholder='Senha atual:'
                            secureText={true}
                            errors={errors.password}
                        />
                        <TextInputWithTopLabel
                            control={control}
                            name='newPassword'
                            title='Nova Senha'
                            showLabel={true}
                            required={true}
                            placeholder='Nova senha:'
                            secureText={true}
                            errors={errors.newPassword}
                        />
                        <TextInputWithTopLabel
                            control={control}
                            name='confirmNewPassword'
                            title='Confirmar Nova Senha'
                            showLabel={true}
                            required={true}
                            placeholder='Confirme nova Senha:'
                            secureText={true}
                            errors={errors.confirmNewPassword}
                        />
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirmChange)} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>

        </Modal>
    );
}