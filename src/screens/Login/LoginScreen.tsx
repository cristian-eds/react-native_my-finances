import React, { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { StackNavigationProp } from '@react-navigation/stack';

import { styles } from './LogingScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchemas } from '../../utils/schemas/loginSchemas';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';
import { UserContext } from '../../context/UserContext';
import { AuthStackParamList } from '../../routes/Stack/types/AuthStackParamList';

export function LoginScreen() {

  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const context = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchemas),
  })

  const handleLogin = async () => {
    setLoading(true);
    const response = await context?.loginUser(watch(), navigation);
    if (response?.error) {
      Alert.alert("Erro no login", response.error)
    } else if (response?.data) {
      Alert.alert("Usuário logado!")
    }
    setLoading(false);
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={globalStyles.title_screens_auth}>Bem vindo</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInputCustom
            name="cpf"
            control={control}
            placeholder='CPF:'
            placeholderTextColor='#090909e8' 
            iconName='person-outline'
            inputMode='numeric'
            maxLength={11}
            errors={errors.cpf}
            readOnly={loading} />

          <TextInputCustom
            name="password"
            control={control}
            placeholder='Senha:'
            placeholderTextColor='#090909e8' 
            iconName='lock-closed-outline'
            secureTextEntry={true}
            errors={errors.password}
            readOnly={loading}
          />

          <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
        </View>
        <View>
          <ButtonPrincipal title={loading ? 'Entrando...' : 'Entrar'} onPress={handleSubmit(handleLogin)} loading={loading} />
          <DividerTextMiddle text='Não possui conta?' />
          <ButtonPrincipal title='Registre-se' onPress={() => navigation.navigate("Register")} />
        </View>
      </View>
    </View>
  );
}