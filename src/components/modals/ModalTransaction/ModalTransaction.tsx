import React, { useEffect, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ModalTransactionStyles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useTransactionStore } from '../../../stores/TransactionStore';
import { useSQLiteContext } from 'expo-sqlite';
import { useAccountStore } from '../../../stores/AccountStore';
import { MovementType } from '../../../domain/enums/movementTypeEnum';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { DatePickerWithTopLabel } from '../../DatePickerWithTopLabel/DatePickerWithTopLabel';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { Transaction } from '../../../domain/transactionModel';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { ModalConfirm } from '../ModalConfirm/ModalConfirm';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { Row } from '../../structure/Row/Row';
import { Cell } from '../../structure/Cell/Cell';
import { useUserContext } from '../../../hooks/useUserContext';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { Spacer } from '../../Spacer/Spacer';
import { transactionSchemas } from '../../../utils/schemas/transactionSchemas';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { DuplicateModel } from '../../../domain/duplicateModel';
import { cancelNotification } from '../../../services/notificationService';
import { useParameterStore } from '../../../stores/ParameterStore';

interface ModalTransactionProps {
    isShow: boolean;
    onClose: () => void;
    mode: 'add' | 'edit' | 'payment',
    transactionData?: Transaction,
    duplicateData?: DuplicateModel
}

export function ModalTransaction({ isShow, onClose, mode, transactionData, duplicateData }: ModalTransactionProps) {

    const { accounts } = useAccountStore();
    const { user } = useUserContext();
    const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
    const { categories } = useCategoryStore();
    const { parameters } = useParameterStore();

    const { control, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm({
        resolver: zodResolver(transactionSchemas),
        defaultValues: {
            description: transactionData?.description ?? '',
            paymentDate: transactionData?.paymentDate ?? new Date().toISOString(),
            value: transactionData?.value.toFixed(2) ?? '0,00',
            movementType: transactionData?.movementType ?? MovementType.Despesa,
            category: transactionData?.categoryId?.toString() ?? undefined,
            accountId: mode === 'add' ? parameters.transactionDefaultAccountId?.toLocaleString() ?? undefined : transactionData?.accountId?.toString(),
            destinationAccountId: transactionData?.destinationAccountId?.toString() ?? ''
        }
    });

    const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

    const database = useSQLiteContext();

    const movementTypeItems = mapMovementTypesToItemsDropdown();
    const accountItems = [{label: 'Nenhum', value: 0},...mapAccountsToItemsDropdown(accounts)];
    const destinationAccountsItems = mapAccountsToItemsDropdown(accounts.filter(acc => acc.id.toString() !== watch().accountId));
    const categoriesItems = mapCategoriesToItemsDropdown(categories);

    const movementType = watch().movementType;

    useEffect(() => {
        if(mode === 'edit') return;
        if (movementType === MovementType.Transferencia && parameters.transactionDefaultCategoryTransferId ) {
            setValue('category', parameters.transactionDefaultCategoryTransferId.toString());
        } else if (movementType === MovementType.Receita && parameters.transactionDefaultCategoryEntryId) {
            setValue('category', parameters.transactionDefaultCategoryEntryId.toString());
        } else if (movementType === MovementType.Despesa && parameters.transactionDefaultCategoryExitId) {
            setValue('category', parameters.transactionDefaultCategoryExitId.toString());
        }
    }, [movementType]);

    const handleCreateTransaction = async () => {
        const formValues = watch();

        const newTransaction = {
            accountId: Number(formValues.accountId),
            value: Number(formValues.value),
            description: formValues.description,
            movementType: formValues.movementType,
            paymentDate: new Date(formValues.paymentDate as Date),
            id: transactionData?.id as number,
            categoryId: Number(formValues.category) ?? undefined,
            destinationAccountId: Number(formValues.destinationAccountId),
            duplicateId: Number(transactionData?.duplicateId)
        }

        let isSaved = false;

        if (mode === 'add' || mode === 'payment') {
            isSaved = await addTransaction(newTransaction, user?.id as number, database);
            if (isSaved && mode === 'payment' && duplicateData?.notificationId) {
                await cancelNotification(duplicateData.notificationId);
            }
        } else if (mode === 'edit') {
            isSaved = await updateTransaction(newTransaction, database);
        }

        if (isSaved) {
            Alert.alert("Transação salva com sucesso!");
            handleClose();
        }
    }

    const handleDeleteTransaction = async () => {
        const isDeleted = await deleteTransaction(transactionData?.id as number, database);
        if (isDeleted) {
            Alert.alert("Transação deletada com sucesso!");
            handleClose()
        }
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    const renderTitle = () => {
        if (mode === 'edit') return 'Editar lançamento';
        if (mode === 'payment') return 'Novo pagamento';
        return 'Novo lançamento'
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}>
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={handleClose} />
                        <Row style={{ flex: 4 }}>
                            <Ionicons name="receipt-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>{renderTitle()}</Text>
                        </Row>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={() => setShowModalConfirmDelete(true)} style={{ width: '15%', alignItems: "flex-end", top: -3 }} /> :
                            <Spacer />}
                    </ModalHeader>
                    <View style={{ rowGap: 10 }}>
                        <Text style={styles.inputsTitle}>INFORMAÇÕES LANÇAMENTO</Text>
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Descrição*:' required />
                        <TextInputWithTopLabel control={control} title='Valor R$' errors={errors.value} name='value' placeholder='Valor:' mask='BRL_CURRENCY' required/>
                        <DatePickerWithTopLabel control={control} name='paymentDate' errors={errors.paymentDate} mode='datetime' title='Data pagamento' required />
                        <Row>
                            <Cell>
                                <PickerWithTopLabel control={control} name='movementType' errors={errors.movementType} labelText='Tipo Movimento' items={movementTypeItems} zIndex={30000} zIndexInverse={20000} placeholder='Tipo Movimento:' />
                            </Cell>
                            <Cell>
                                <PickerWithTopLabel control={control} name='category' errors={errors.movementType} labelText='Categoria' items={categoriesItems} zIndex={40000} placeholder='Categoria:' />
                            </Cell>
                        </Row>
                        <Text style={[styles.inputsTitle, { marginTop: 7 }]}>CONTAS</Text>
                        <Row>
                            <Cell>
                                <PickerWithTopLabel control={control} name='accountId' errors={errors.accountId} labelText='Conta' items={accountItems} zIndex={20000} zIndexInverse={30000} placeholder='Conta origem' />
                            </Cell>
                            {watch().movementType === MovementType.Transferencia &&
                                <Cell>
                                    <PickerWithTopLabel control={control} name='destinationAccountId' errors={errors.destinationAccountId} labelText='Conta Destino' items={destinationAccountsItems} zIndex={20000} zIndexInverse={30000} placeholder='Conta Destino' />
                                </Cell>}
                        </Row>

                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={handleClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleCreateTransaction)} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
            <ModalConfirm isShow={showModalConfirmDelete} title='Confirma exclusão da transação?' onClose={() => setShowModalConfirmDelete(false)} onConfirm={handleDeleteTransaction} />
        </Modal>
    );
}