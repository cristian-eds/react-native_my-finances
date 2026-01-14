import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { styles } from './RegisterScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { TextInputCustom } from '../../components/TextInputCustom/TextInputCustom';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { DividerTextMiddle } from '../../components/DividerTextMiddle/DividerTextMiddle';
import { createUser } from '../../services/userService';
import { useSQLiteContext } from 'expo-sqlite';
import { useForm } from 'react-hook-form';
import { userSchemas } from '../../utils/schemas/userSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthStackParamList } from '../../routes/Stack/types/AuthStackParamList';
import { login } from '../../services/authService';
import { useState } from 'react';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Row } from '../../components/structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { ModalTermsPolicyPrivacy } from '../../components/modals/ModalTermsPolicyPrivacy/ModalTermsPolicyPrivacy';


export function RegisterScreen() {

  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const db = useSQLiteContext();

  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showModalTerms, setShowModalTerms] = useState(false);

  const { control, handleSubmit, watch, setValue ,formState: { errors } } = useForm({
    resolver: zodResolver(userSchemas),
  })

  const handleRegister = async () => {
    const formValues = watch();
    setLoading(true);
    const response = await createUser(formValues, db);
    if (response?.error) {
      Alert.alert('Erro ao registrar', response.error);
      setLoading(false)
      return;
    }
    Alert.alert('Sucesso', 'Registrado com sucesso!');
    if (response.data) {
      await login(db, { cpf: formValues.cpf, password: formValues.password })
      navigation.navigate("RegisterInitialAccount", { user: response?.data });
    }

    setLoading(false);
  }

  const handleAcceptTerms = () => {
    if(termsAccepted) {
      setTermsAccepted(false);
      setValue('termsAccepted',false);
    } else {
      setTermsAccepted(true);
      setValue('termsAccepted',true);
    }
  }

  const renderAcceptTermsPolicyPrivacy = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Checkbox checked={termsAccepted} onPress={handleAcceptTerms} mode={'square'} />
        <View style={{ justifyContent: 'flex-start', paddingLeft: 10 }}>
          <Text style={{ fontSize: 14 }}>Aceitar termos e política de privacidade</Text>
          <Row style={{ justifyContent: 'flex-start', alignItems: "center", columnGap: 5 }}>
            <Ionicons name="link-outline" size={18} color='#3572f7' />
            <TouchableOpacity onPress={() => setShowModalTerms(true)}>
              <Text style={{ color: '#3572f7' }}>Ver termos</Text>
            </TouchableOpacity>
          </Row>
        </View>
      </View>
    )
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, { textAlign: 'right' }]}>Registro</Text>
      </View>
      <View style={styles.container}>
        <View>
          <TextInputCustom name="name" control={control} placeholder='Informe seu nome: ' placeholderTextColor='#090909e8' errors={errors.name} />
          <TextInputCustom name="cpf" control={control} placeholder='Informe seu CPF: ' placeholderTextColor='#090909e8' inputMode='numeric' maxLength={11} errors={errors.cpf} />
          <TextInputCustom name="password" control={control} placeholder='Digite sua senha: ' placeholderTextColor='#090909e8' secureTextEntry={true} errors={errors.password} />
          <TextInputCustom name="confirmPassword" control={control} placeholder='Confirme sua senha: ' placeholderTextColor='#090909e8' secureTextEntry={true} errors={errors.confirmPassword} />
          {renderAcceptTermsPolicyPrivacy()}
          {errors.termsAccepted && <Text style={{paddingLeft: 25 ,fontSize: 13, color: '#fc1d1d'}}>{errors.termsAccepted.message}</Text>}
        </View>

        <View>
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegister)} loading={loading}  mode='confirm'/>
          <DividerTextMiddle text='Já possui conta?' />
          <ButtonPrincipal title='Entrar' onPress={() => navigation.navigate('Login')}/>
        </View>
      </View>
      {showModalTerms && <ModalTermsPolicyPrivacy isShow={showModalTerms} onClose={() => setShowModalTerms(false)} onAccept={() => setTermsAccepted(true)}/>}
    </View>
  );
}