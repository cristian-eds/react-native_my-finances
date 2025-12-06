import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { styles } from './TabInfosStyles';
import { DatePickerWithTopLabel } from '../../../DatePickerWithTopLabel/DatePickerWithTopLabel';
import { TextInputWithTopLabel } from '../../../TextInputWithTopLabel/TextInputWithTopLabel';
import { Row } from '../../../structure/Row/Row';
import { Cell } from '../../../structure/Cell/Cell';
import { PickerWithTopLabel } from '../../../PickerWithTopLabel/PickerWithTopLabel';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown } from '../../../../utils/mappers/itemsPickerMapper';
import { Ionicons } from '@expo/vector-icons';
import { Control, FieldError, FieldErrors, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form';
import { FinanceFormFields } from '../../../../utils/schemas/financeSchemas';
import { useAccountStore } from '../../../../stores/AccountStore';
import { useCategoryStore } from '../../../../stores/CategoryStore';
import { DuplicateModel } from '../../../../domain/duplicateModel';



interface TabInfosProps {
    control: Control<FinanceFormFields>,
    errors: FieldErrors<FinanceFormFields> | Merge<FieldError, FieldErrorsImpl<FinanceFormFields>>;
    recurrendeDuplicates: DuplicateModel[] | undefined,
    setShowModalInstallments: (state: boolean) => void
}

export function TabInfos({control, errors, recurrendeDuplicates, setShowModalInstallments}: TabInfosProps) {

    const {accounts} = useAccountStore();
    const {categories} = useCategoryStore();

    return (
        <>
            <DatePickerWithTopLabel control={control} name='issueDate' errors={errors.issueDate} mode='date' title='Data emissão' required />
            <TextInputWithTopLabel control={control} title='Descrição' errors={errors.description} name='description' placeholder='Descrição*:' required />
            <TextInputWithTopLabel control={control} title='Valor' errors={errors.totalValue} name='totalValue' placeholder='Valor*:' required />
            <Row>
                <Cell>
                    <PickerWithTopLabel labelText='Tipo Movimento' control={control} items={mapMovementTypesToItemsDropdown()} name='movementType' errors={errors.movementType} zIndex={10000} required />
                </Cell>
                <Cell>
                    <PickerWithTopLabel labelText='Categoria' control={control} items={mapCategoriesToItemsDropdown(categories)} name='categoryId' errors={errors.categoryId} placeholder='Categoria:' zIndex={10000} required />
                </Cell>
            </Row>
            <PickerWithTopLabel labelText='Conta' control={control} items={mapAccountsToItemsDropdown(accounts)} name='accountId' errors={errors.accountId} placeholder='Conta:' zIndexInverse={1000} zIndex={8000} />
            <DatePickerWithTopLabel control={control} name='dueDate' errors={errors.dueDate} mode='date' title='Data vencimento' required />
            {recurrendeDuplicates && recurrendeDuplicates.length > 1 && <TouchableOpacity style={styles.buttonInstallmentsPreview} onPress={() => setShowModalInstallments(true)}>
                <Ionicons name="calendar-clear-outline" size={18} color="black" />
                <Text>Ver parcelas recorrentes</Text>
            </TouchableOpacity>}
        </>
    );
}