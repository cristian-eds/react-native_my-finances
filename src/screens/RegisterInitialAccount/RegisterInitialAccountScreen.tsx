import React, { useContext, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RouteProp, useRoute } from '@react-navigation/native';

import { styles } from './RegisterInitialAccountScreenStyles';
import { styles as globalStyles } from '../../styles/GlobalStyles';

import { TextInpuWithLeftLabel } from '../../components/TextInpuWithLeftLabel/TextInputWithLeftLabel';
import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';

import { accountSchemas } from '../../utils/schemas/accountSchemas';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';
import { Status } from '../../domain/enums/statusEnum';

import { AuthStackParamList } from '../../routes/Stack/types/AuthStackParamList';
import { useAccountStore } from '../../stores/AccountStore';
import { useUserContext } from '../../hooks/useUserContext';
import { requestPermissions } from '../../utils/notifications/NotificationsConfig';
import { generateSessionToken } from '../../services/sessionTokenService';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { TextInputWithTopLabel } from '../../components/TextInputWithTopLabel/TextInputWithTopLabel';
import { PickerWithTopLabel } from '../../components/PickerWithTopLabel/PickerWithTopLabel';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { Row } from '../../components/structure/Row/Row';
import { Cell } from '../../components/structure/Cell/Cell';


export function RegisterInitialAccountScreen() {

  const db = useSQLiteContext();
  const context = useUserContext();

  const [loading, setLoading] = useState(false);
  const [showDetailInputs, setShowDetailInputs] = useState(false);

  const route = useRoute<RouteProp<AuthStackParamList, 'RegisterInitialAccount'>>();
  const { user } = route.params;
  const { createAccount } = useAccountStore();

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(accountSchemas),
    defaultValues: {
      accountNumber: '',
      agency: '',
      balance: '',
      bankCode: '',
      holderName: '',
      name: '',
      status: Status.Ativo,
      type: TypeAccount.Corrente
    }
  })

  const accountTypeItems = Object.keys(TypeAccount).map((text) => { return { label: text, value: TypeAccount[text as keyof typeof TypeAccount] } })


  const handleRegisterAccount = async () => {
    const formValues = watch();
    setLoading(true);
    const created = await createAccount(
      {
        accountNumber: formValues.accountNumber ?? "",
        agency: formValues.agency ?? "",
        balance: Number(formValues.balance) ?? 0,
        bankCode: formValues.bankCode ?? "",
        holderName: formValues.holderName ?? "",
        name: formValues.name,
        status: Status.Ativo,
        type: formValues.type,
        creationDate: new Date().toISOString(),
      }, Number(user?.id), db);

    if (created) {
      Alert.alert("Conta criada!");
      await requestPermissions();
      context.handleSetUser(user);
      await generateSessionToken(user, db);
    }
    setLoading(false);
  }

  return (
    <View style={globalStyles.container_screens_auth}>
      <View style={globalStyles.container_header_auth}>
        <Text style={[globalStyles.title_screens_auth, { textAlign: 'right' }]}>Cadastro      Conta Inicial</Text>
      </View>
      <View style={styles.container}>
        <SectionWithTitle title='DADOS DA CONTA' containerStyle={styles.customSection}>

          <TextInputWithTopLabel control={control} title='Nome da conta' errors={errors.name} name='name' placeholder='Informe nome da conta' required />
          <TextInputWithTopLabel control={control} title='Saldo inicial' errors={errors.balance} name='balance' placeholder='Saldo inicial da conta' required mask='BRL_CURRENCY'/>
          <PickerWithTopLabel items={accountTypeItems} control={control} labelText='Tipo conta' errors={errors.type} name='type' />

          <TouchableOpacity style={styles.showMore} onPress={() => setShowDetailInputs(!showDetailInputs)}>
            <Text style={styles.showMoreText}>Preencher detalhes da conta...</Text>
            <Ionicons name={showDetailInputs ? 'chevron-up' : 'chevron-down'} size={20} color="black" />
          </TouchableOpacity>
        </SectionWithTitle>
        {
          showDetailInputs && <SectionWithTitle title='DETALHES DA CONTA' containerStyle={styles.customSection}>
            <TextInputWithTopLabel control={control} title='Número da conta' errors={errors.accountNumber} name='accountNumber' placeholder='Número da conta' />
            <Row>
              <Cell>
                <TextInputWithTopLabel control={control} title='Código do banco' errors={errors.bankCode} name='bankCode' placeholder='Código do banco' />
              </Cell>
              <Cell>
                <TextInputWithTopLabel control={control} title='Agência' errors={errors.agency} name='agency' placeholder='Agência' />
              </Cell>
            </Row>
            <TextInputWithTopLabel control={control} title='Responsável' errors={errors.holderName} name='holderName' placeholder='Nome do responsável' />

          </SectionWithTitle>
        }
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ButtonPrincipal title='Avançar' onPress={handleSubmit(handleRegisterAccount)} loading={loading} mode='confirm' />
        </View>
      </View>
    </View>
  );
}