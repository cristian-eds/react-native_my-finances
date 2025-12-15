import React from 'react';
import { Text, View } from 'react-native';

import { styles as globalStyles } from '../../styles/GlobalStyles';
import { styles } from './ForgotPasswordStyles'
import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { useForm } from 'react-hook-form';
import { userSchemas } from '../../utils/schemas/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../routes/Stack/types/AuthStackParamList';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';
import { resetPasswordSchemas } from '../../utils/schemas/resetPasswordSchemas';

export function ForgotPasswordScreen() {

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: zodResolver(resetPasswordSchemas),
    })

    const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

    const hangleConfirm = () => {
        console.log(watch())
    }

    return (
        <View style={globalStyles.container_screens_auth}>
            <View style={globalStyles.container_header_auth}>
                <Text style={[globalStyles.title_screens_auth, { textAlign: 'right' }]}>Redefinir Senha</Text>
            </View>
            <View style={styles.container}>
                <View>
                    <TextInputCustom name="cpf" control={control} placeholder='Informe seu CPF: ' placeholderTextColor='#090909e8' inputMode='numeric' maxLength={11} errors={errors.cpf} />
                    <TextInputCustom name="password" control={control} placeholder='Digite sua senha: ' placeholderTextColor='#090909e8' secureTextEntry={true} errors={errors.password} />
                    <TextInputCustom name="confirmPassword" control={control} placeholder='Confirme sua senha: ' placeholderTextColor='#090909e8' secureTextEntry={true} errors={errors.confirmPassword} />
                </View>
                <View>
                    <ButtonPrincipal title={'Confirmar'} onPress={handleSubmit(hangleConfirm)} />
                    <DividerTextMiddle text='Voltar para tela de login?' />
                    <ButtonPrincipal title={'Voltar'} onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}