import React from 'react';
import { Modal, Text, View } from 'react-native';

import { styles } from './ModalFiltersDuplicateStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Spacer } from '../../Spacer/Spacer';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { mapCategoriesToItemsDropdown, mapOrderTypesToItemsDropdown, mappColumnsOrderDuplicateToItemsDropdown, mappDuplicateStatusToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDuplicateStore } from '../../../stores/DuplicateStores';
import { Row } from '../../structure/Row/Row';
import { Cell } from '../../structure/Cell/Cell';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { filtersDuplicateSchemas } from '../../../utils/schemas/filtersDuplicateSchemas';

interface ModalFiltersDuplicateProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalFiltersDuplicate({ isShow, onClose }: ModalFiltersDuplicateProps) {

    const { categories } = useCategoryStore();
    const { filters, ordernation, cleanFilters, setFiltersOptions, setOrdernation } = useDuplicateStore();

    const { control, reset, watch } = useForm({
        resolver: zodResolver(filtersDuplicateSchemas),
        defaultValues: {
            categories: filters.categories || [],
            orderColumn: ordernation.orderColumn,
            orderType: ordernation.orderType,
            status: filters.status || []
        }
    })

    const handleFilter = () => {
        const fields = watch();
        setFiltersOptions(fields.categories, fields.status);
        setOrdernation(fields.orderColumn, fields.orderType);
        onClose();
    }

    const handleClose = () => {
        reset();
        cleanFilters();
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
                        <Text style={styles.title}>Filtros e Ordenação</Text>
                        <Spacer />
                    </ModalHeader>
                    <View style={styles.body}>
                        <Text style={styles.inputsTitle}>Filtros</Text>
                        <PickerWithTopLabel
                            labelText='Categorias'
                            control={control}
                            items={mapCategoriesToItemsDropdown(categories)}
                            name='categories'
                            multiple={true}
                            zIndexInverse={2000}
                            zIndex={3000}
                            placeholder='Categorias...'
                        />
                        <PickerWithTopLabel
                            labelText='Status'
                            control={control}
                            items={mappDuplicateStatusToItemsDropdown()}
                            name='status'
                            multiple={true}
                            zIndexInverse={1800}
                            zIndex={2800}
                            placeholder='Status...'
                        />
                        <Text style={[styles.inputsTitle, { marginTop: 5 }]}>Ordenação</Text>
                        <Row>
                            <Cell>
                                <PickerWithTopLabel
                                    labelText='Coluna'
                                    placeholder='Coluna...'
                                    control={control}
                                    items={mappColumnsOrderDuplicateToItemsDropdown()}
                                    name='orderColumn'
                                    multiple={false}
                                    zIndexInverse={250}
                                />
                            </Cell>
                            <Cell>
                                <PickerWithTopLabel
                                    labelText='Ordem'
                                    placeholder='Ordem...'
                                    control={control}
                                    items={mapOrderTypesToItemsDropdown()}
                                    name='orderType'
                                    multiple={false}
                                    zIndexInverse={250}
                                />
                            </Cell>
                        </Row>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={handleClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleFilter} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}