import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSQLiteContext } from 'expo-sqlite';

import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './AccountDetailsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { PickerWithLeftLabel } from '../../components/PickerWithLeftLabel/PickerWithLeftLabel';

import { ButtonPrincipal } from '../../components/buttons/ButtonPrincipal/ButtonPrincipal';
import { RowWithLeftLabel } from '../../components/RowWithLeftLabel/RowWithLeftLabel';
import { updateAccountSchemas } from '../../utils/schemas/updateAccountSchemas';

import { useAccountStore } from '../../stores/AccountStore';
import { TypeAccount } from '../../domain/enums/typeAccountEnum';
import { Status } from '../../domain/enums/statusEnum';
import { SelectAccount } from '../../components/SelectAccount/SelectAccount';
import { formaterIsoDateToDefaultPattern } from '../../utils/DateFormater';
import { ModalConfirm } from '../../components/modals/ModalConfirm/ModalConfirm';
import ModalAccount from '../../components/modals/ModalAccount/ModalAccount';
import { useNavigation } from '@react-navigation/native';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { Row } from '../../components/structure/Row/Row';
import { SectionWithTitle } from '../../components/structure/SectionWithTitle/SectionWithTitle';
import { TextInputWithTopLabel } from '../../components/TextInputWithTopLabel/TextInputWithTopLabel';
import { PickerWithTopLabel } from '../../components/PickerWithTopLabel/PickerWithTopLabel';
import { Cell } from '../../components/structure/Cell/Cell';
import { RowWithTopLabel } from '../../components/RowWithTopLabel/RowWithTopLabel';



export function AccountDetails() {

    const { activeAccount, updateAccount, toggleStatusAccount, deleteAccount } = useAccountStore();
    const db = useSQLiteContext();
    const navigation = useNavigation();

    const [showModalAddAccount, setShowModalAddAccount] = useState(false);
    const [showModalConfirmDelete, setModalConfirmDelete] = useState(false);

    const { control, handleSubmit, watch, formState: { errors, isDirty }, reset } = useForm({
        resolver: zodResolver(updateAccountSchemas),
        defaultValues: {
            accountNumber: activeAccount?.accountNumber ?? "",
            agency: activeAccount?.agency ?? "",
            bankCode: activeAccount?.bankCode ?? "",
            holderName: activeAccount?.holderName ?? "",
            name: activeAccount?.name ?? "",
            type: activeAccount?.type ?? TypeAccount.Corrente
        }
    })

    const accountTypeItems = Object.keys(TypeAccount).map((text) => { return { label: text, value: TypeAccount[text as keyof typeof TypeAccount] } })


    const handleUpdateAccount = async () => {
        const formValues = watch();
        const newData = {
            accountNumber: formValues.accountNumber ?? "",
            agency: formValues.agency ?? "",
            bankCode: formValues.bankCode ?? "",
            holderName: formValues.holderName ?? "",
            name: formValues.name,
            type: formValues.type,
            id: activeAccount?.id as number
        };
        const isUpdated = await updateAccount(newData, db);
        if (isUpdated) {
            Alert.alert("Conta atualizada com sucesso!");
        }
    }

    const handleToggleStatusAccount = async () => {
        await toggleStatusAccount(activeAccount?.id as number, db);
    }

    const handleShowModalAddAccount = () => {
        setShowModalAddAccount(true);
    }

    const handleDeleteAccount = async () => {
        const isDeleted = await deleteAccount(activeAccount?.id as number, db);
        if (isDeleted) {
            Alert.alert("Conta excluída com sucesso!");
            setModalConfirmDelete(false);
            navigation.canGoBack();
        }
    }

    useEffect(() => {
        if (activeAccount) {
            reset(activeAccount)
        }
    }, [activeAccount]);

    useEffect(() => {
        navigation.getParent()?.setOptions(
            { title: 'Detalhes da conta' }
        )

        return () => {
            navigation.getParent()?.setOptions(
                { title: '' }
            )
        }
    }, [])

    const renderStatusLabel = (color: string) => {
        return (
            <TouchableOpacity onPress={handleToggleStatusAccount}>
                <Row>
                    <View style={[styles.statusIndicator, { backgroundColor: color }]}></View>
                    <Text style={[styles.statusLabel, { color: color }]}>{activeAccount?.status}</Text>
                </Row>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[GlobalStyles.container_screens_normal, { rowGap: 8 }]}>
            <Row>
                <ButtonBack onPress={() => navigation.goBack()} />
                <ButtonPlus onPress={handleShowModalAddAccount} />
            </Row>
            <SectionWithTitle title='DADOS DA CONTA' titleStyle={{ textAlign: 'center' }} containerStyle={{ rowGap: 10, marginTop: 10 }}>
                <SelectAccount labelStyle={{ textAlign: 'left' }} />
                <TextInputWithTopLabel control={control} title='Nome da Conta' errors={errors.name} name='name' placeholder='Nome da conta' />
                <PickerWithTopLabel items={accountTypeItems} control={control} labelText='Tipo conta' errors={errors.type} name='type' zIndex={1000} />
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
            <SectionWithTitle title='INFORMAÇÕES' titleStyle={{ textAlign: 'center' }} containerStyle={{ rowGap: 15 }}>
                <Row>
                    <Cell>
                        <RowWithTopLabel title='Data Cadastro' stylesProp={{ justifyContent: 'space-between', height: 45 }}>
                            <Text>{activeAccount?.creationDate ? formaterIsoDateToDefaultPattern(new Date(activeAccount.creationDate)) : ""}</Text>
                        </RowWithTopLabel>
                    </Cell>
                    <Cell>
                        <RowWithTopLabel title='Status' stylesProp={{ justifyContent: 'space-between', height: 45 }}>
                            {activeAccount?.status === Status.Ativo ? renderStatusLabel('green') : renderStatusLabel('red')}
                        </RowWithTopLabel>
                    </Cell>
                </Row>
            </SectionWithTitle>
            <View>
                {isDirty ? <Row>
                    <Cell>
                        <ButtonPrincipal title='Cancelar Alterações' onPress={() => reset()} style={{width: '100%' }} textStyle={{fontSize: 16}}/>
                    </Cell>
                    <Cell>
                        <ButtonPrincipal title='Salvar Alterações' onPress={handleSubmit(handleUpdateAccount)} style={{width: '100%' }} textStyle={{fontSize: 16}} mode='confirm'/>
                    </Cell>
                </Row> : <>
                    <ButtonPrincipal iconName='trash-outline' title='Excluir conta' onPress={() => setModalConfirmDelete(true)} style={{ marginTop: 15 }} />
                </>}

            </View>

            <ModalAccount isShow={showModalAddAccount} onClose={() => setShowModalAddAccount(false)} />
            <ModalConfirm isShow={showModalConfirmDelete} title='Confirma a exclusão da conta?' onConfirm={handleDeleteAccount} onClose={() => setModalConfirmDelete(false)} />

        </View>
    );
}