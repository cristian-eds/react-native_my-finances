import React, { useState } from 'react';
import { Alert, Modal, View } from 'react-native';

import { styles } from './ModalInstallmentsStyles';
import { Row } from '../../structure/Row/Row';
import { Text } from 'react-native';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Ionicons } from '@expo/vector-icons';
import { Spacer } from '../../Spacer/Spacer';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonPrincipal } from '../../buttons/ButtonPrincipal/ButtonPrincipal';
import { FlatList } from 'react-native-gesture-handler';
import { InstallmentItem } from './InstallmentItem/InstallmentItem';
import { DuplicateModel } from '../../../domain/duplicateModel';
import { useDuplicateStore } from '../../../stores/DuplicateStores';
import { useSQLiteContext } from 'expo-sqlite';
import { useUserContext } from '../../../hooks/useUserContext';
import { Cell } from '../../structure/Cell/Cell';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { Control, FieldError } from 'react-hook-form';
import { InstallmentsForm } from '../../../utils/schemas/installmentsSchemas';
import { formaterNumberToBRL } from '../../../utils/NumberFormater';


export interface Item {
    id: number;
    sequencyItem: number;
    dueDate: Date;
    value: number;
    description: string;
}

interface InstallmentProps {
    isShow?: boolean;
    onClose: () => void;
    onCreateInstallments?: () => void;
    items: Item[];
    data: Omit<DuplicateModel, 'id'>;
    mode?: 'create' | 'edit';
    control?: Control<InstallmentsForm> | any,
    errors?: FieldError | any;
}

export function ModalInstallments({ items, isShow, onClose, onCreateInstallments, data, mode = 'create', control, errors }: InstallmentProps) {

    const [controlledItems, setControlledItems] = useState<Item[]>(items);
    const { createRecurrenceDuplicates } = useDuplicateStore();
    const { categories } = useCategoryStore();

    const database = useSQLiteContext();
    const { user } = useUserContext();

    const handleUpdateItem = (updatedItem: Item) => {
        const updatedItems = controlledItems.map(item =>
            item.sequencyItem === updatedItem.sequencyItem ? updatedItem : item
        );
        setControlledItems(updatedItems);
    }

    const handleGenerateInstallments = async () => {
        const mappedItems: Omit<DuplicateModel, 'id'>[] = controlledItems.map((item, index) => ({
            sequencyItem: item.sequencyItem,
            dueDate: item.dueDate,
            accountId: data.accountId,
            description: item.description,
            totalValue: item.value,
            issueDate: new Date(data.issueDate as Date),
            categoryId: data.categoryId,
            movementType: data.movementType,
            numberInstallments: index + 1
        }));

        const created = await createRecurrenceDuplicates(mappedItems, user?.id as number, database);

        if (created) {
            onClose();
            onCreateInstallments && onCreateInstallments();
            Alert.alert('Sucesso', 'Parcelas geradas com sucesso!');
        }
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
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="calendar-clear-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.title}>Parcelas</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    {
                        control && errors && (
                            <View style={{ rowGap: 15, marginBottom: 15 }}>
                                <Text style={styles.subtitle}>Informações</Text>
                                <Row>
                                    <Cell>
                                        <PickerWithTopLabel labelText='Tipo Movimento' control={control} items={mapMovementTypesToItemsDropdown()} name='movementType' errors={errors.movementType} zIndex={10000} required />
                                    </Cell>
                                    <Cell>
                                        <PickerWithTopLabel labelText='Categoria' control={control} items={mapCategoriesToItemsDropdown(categories)} name='categoryId' errors={errors.categoryId} placeholder='Categoria:' zIndex={10000} required />
                                    </Cell>
                                </Row>

                            </View>)
                    }
                    {mode === 'create' && <Text style={styles.subtitle}>Parcelas que serão geradas</Text>}
                    <Row key={0} style={styles.headerItems}>
                        <Text>#</Text>
                        <Text style={{ flex: 3 }}>Descrição</Text>
                        <Text style={{ flex: 3 }}>Vencimento</Text>
                        <Text style={{ flex: 2.5, textAlign: 'right', paddingRight: 5 }}>Valor</Text>
                    </Row>
                    <View style={{ maxHeight: 300 }}>
                        <FlatList
                            data={controlledItems}
                            renderItem={({ item }) => <InstallmentItem item={item} updateItem={handleUpdateItem} readonly={mode === 'edit'} />}
                            keyExtractor={(item) => item.sequencyItem.toString()}
                        />
                    </View>

                    <Text style={{textAlign: 'right', fontWeight: '500', paddingRight: 10}}>Valor Total: {formaterNumberToBRL(controlledItems.reduce((prev, current) => prev + current.value, 0))}</Text>


                    {mode === 'create' &&
                        <ModalFooter>
                            <ButtonPrincipal title='Gerar parcelas' onPress={handleGenerateInstallments} style={{ backgroundColor: '#e3e3e3ff', marginBottom: 10 }} iconName='checkmark-done' />
                        </ModalFooter>
                    }
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}