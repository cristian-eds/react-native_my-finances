import React from 'react';
import { Alert, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/RootStackParamList';

import { styles } from './LogingScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSQLiteContext } from 'expo-sqlite';
import { login } from '../../services/authService';
import { loginSchemas } from '../../schemas/loginSchemas';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';

export function LoginScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const db = useSQLiteContext();

  const { control, handleSubmit, watch, formState: {errors} } = useForm({
    resolver: zodResolver(loginSchemas),
  })

  const handleLogin = async () => {
    const response = await login(db, watch());
    if(response?.error) {
      Alert.alert(response.error);
      return;
    }
    Alert.alert('Login realizado com sucesso!', response?.data?.name);

  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={globalStyles.title_screens_auth}>Bem vindo</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInputCustom name="cpf" control={control} placeholder='CPF:' iconName='perm-identity' inputMode='numeric' maxLength={11} errors={errors.cpf}/>
          <TextInputCustom name="password" control={control} placeholder='Senha:' iconName='lock-outline' secureTextEntry={true} errors={errors.password}></TextInputCustom>
          <Text style={styles.forgot_password}>Esqueceu a senha?</Text>
        </View>
        <View>
          <ButtonPrincipal title='Entrar' onPress={handleSubmit(handleLogin)} />
          <DividerTextMiddle text='Não possui conta?'/>
          <ButtonPrincipal title='Registrar-se' onPress={() => navigation.navigate("Register")} />
        </View>
      </View>
    </View>
  );
}