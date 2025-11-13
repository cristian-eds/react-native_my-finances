import React from 'react';
import { Alert, Modal, Text, View } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import { styles } from './ModalFinanceStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Row } from '../structure/Row/Row';
import { ButtonIconSimple } from '../../buttons/ButtonIconSimple/ButtonIconSimple';
import { Spacer } from '../../Spacer/Spacer';
import { DatePickerWithTopLabel } from '../../DatePickerWithTopLabel/DatePickerWithTopLabel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { financeSchemas } from '../../../utils/schemas/financeSchemas';
import { DuplicateModel } from '../../../domain/duplicateModel';
import { MovementType } from '../../../domain/enums/movementTypeEnum';
import { TextInputWithTopLabel } from '../../TextInputWithTopLabel/TextInputWithTopLabel';
import { Cell } from '../structure/Cell/Cell';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { useAccountStore } from '../../../stores/AccountStore';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useDuplicateStore } from '../../../stores/DuplicateStores';
import { useUserContext } from '../../../hooks/useUserContext';
import { useSQLiteContext } from 'expo-sqlite';

interface ModalFinanceProps {
    isShow: boolean,
    mode: 'edit' | 'add',
    duplicateData?: DuplicateModel,
    onClose: () => void
}

export function ModalFinance({ isShow, mode, duplicateData, onClose }: ModalFinanceProps) {

    const { categories } = useCategoryStore();
    const { accounts } = useAccountStore();
    const { addDuplicate,updateDuplicate } = useDuplicateStore();
    const { user } = useUserContext();

    const database = useSQLiteContext();

    const { control, formState: { errors }, handleSubmit, watch, reset } = useForm({
        resolver: zodResolver(financeSchemas),
        defaultValues: {
            accountId: duplicateData?.accountId?.toLocaleString() ?? undefined,
            categoryId: duplicateData?.categoryId?.toLocaleString() ?? undefined,
            description: duplicateData?.description ?? undefined,
            dueDate: duplicateData?.dueDate ?? undefined,
            issueDate: duplicateData?.issueDate ?? new Date(),
            movementType: duplicateData?.movementType ?? MovementType.Despesa,
            totalValue: duplicateData?.totalValue.toLocaleString()
        }
    });

    const handleConfirm = async () => {
        const formValues = watch();

        const newDuplicate: DuplicateModel = {
            accountId: Number(formValues.accountId),
            categoryId: Number(formValues.categoryId),
            description: formValues.description,
            dueDate: new Date(formValues.dueDate as Date),
            issueDate: new Date(formValues.issueDate as Date),
            movementType: formValues.movementType,
            totalValue: Number(formValues.totalValue),
            id: duplicateData?.id as number
        }

        let isSaved;

        if (mode === 'add') {
            isSaved = await addDuplicate(newDuplicate, user?.id as number, database)
        } else if (mode === 'edit') {
            isSaved = await updateDuplicate(newDuplicate, database);
        }

        if (isSaved) {
            Alert.alert("Finança salva com sucesso!");
            handleClose();
        }
    }

    const handleClose = () => {
        reset();
        onClose();
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
                        <ButtonBack onPress={onClose} />
                        <Row>
                            <Ionicons name="cash-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>{mode === 'add' ? 'Nova Finança' : 'Editar Finança'}</Text>
                        </Row>
                        {mode === 'edit' ?
                            <ButtonIconSimple iconName='trash-outline' onPress={() => { }} style={{ width: '15%', alignItems: "flex-end", top: -3 }} /> :
                            <Spacer />}
                    </ModalHeader>
                    <View style={{ rowGap: 10 }}>
                        <Text style={styles.inputsTitle}>INFORMAÇÕES FINANÇA</Text>
                        <DatePickerWithTopLabel control={control} name='issueDate' errors={errors.issueDate} mode='date' title='Data emissão' required showLabel={false} />
                        <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Descrição*:' required showLabel={false} />
                        <TextInputWithTopLabel control={control} title='Valor' errors={errors.totalValue} name='totalValue' placeholder='Valor*:' required showLabel={false} />
                        <Row>
                            <Cell>
                                <PickerWithTopLabel control={control} items={mapMovementTypesToItemsDropdown()} name='movementType' errors={errors.movementType} zIndex={10000} required />
                            </Cell>
                            <Cell>
                                <PickerWithTopLabel control={control} items={mapCategoriesToItemsDropdown(categories)} name='categoryId' errors={errors.categoryId} placeholder='Categoria:' zIndex={10000} required />
                            </Cell>
                        </Row>
                        <PickerWithTopLabel control={control} items={mapAccountsToItemsDropdown(accounts)} name='accountId' errors={errors.accountId} placeholder='Conta:' zIndexInverse={1000} />
                        <DatePickerWithTopLabel control={control} name='dueDate' errors={errors.dueDate} mode='date' title='Data vencimento*:' required showLabel={false} />
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleSubmit(handleConfirm)} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}