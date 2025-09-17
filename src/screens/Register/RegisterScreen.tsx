import { useState } from 'react';
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


export function RegisterScreen() {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const db = useSQLiteContext()

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 

  const handleRegister = async () => {
    const response = await create(db, { name, cpf, password });
    Alert.alert('Registrado com sucesso!', response && response.id?.toString());
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, {textAlign: 'right'}]}>Registro</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInputCustom placeholder='Informe seu nome: ' value={name} onChangeText={(e) => setName(e)}/>
          <TextInputCustom placeholder='Informe seu CPF: ' value={cpf} onChangeText={(e) => setCpf(e)}/>
          <TextInputCustom placeholder='Digite sua senha: ' value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} />
          <TextInputCustom placeholder='Confirme sua senha: ' value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} secureTextEntry={true} />
        </View>

        <View>
          <ButtonPrincipal title='Avançar' onPress={handleRegister} />
          <DividerTextMiddle />
          <ButtonPrincipal title='Entrar' onPress={() => navigation.navigate('Login')} />
        </View>
      </View>

    </View>


  );
}