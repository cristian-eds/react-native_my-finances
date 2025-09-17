import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../routes/types/RootStackParamList';

import { styles } from './RegisterScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';
import { create } from '../../services/userService';
import { useSQLiteContext } from 'expo-sqlite';
import { useForm } from 'react-hook-form';
import { userSchemas } from '../../schemas/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';


export function RegisterScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const db = useSQLiteContext();

   const { control, handleSubmit, watch, formState: {errors} } = useForm({
    resolver: zodResolver(userSchemas),
  })

  const handleRegister = async () => {
    const response = await create(watch(), db);
    Alert.alert('Registrado com sucesso!', response && response.data?.id?.toString());
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, {textAlign: 'right'}]}>Registro</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInputCustom name="name" control={control} placeholder='Informe seu nome: ' errors={errors.name} />
          <TextInputCustom name="cpf"  control={control} placeholder='Informe seu CPF: ' inputMode='numeric' maxLength={11} errors={errors.cpf} />
          <TextInputCustom name="password" control={control} placeholder='Digite sua senha: ' secureTextEntry={true} errors={errors.password} />
          <TextInputCustom name="confirmPassword" control={control} placeholder='Confirme sua senha: '  secureTextEntry={true} errors={errors.confirmPassword} />
        </View>

        <View>
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegister)} />
          <DividerTextMiddle text='Já possui conta?'/>
          <ButtonPrincipal title='Entrar' onPress={() => navigation.navigate('Login')} />
        </View>
      </View>

    </View>


  );
}