import React from 'react';
import { Modal, Text } from 'react-native';

import { styles } from './ModalFiltersTransactionStyles';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalContent } from '../structure/ModalContent/ModalContent';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { View } from 'react-native';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { Spacer } from '../../Spacer/Spacer';
import { PickerWithTopLabel } from '../../PickerWithTopLabel/PickerWithTopLabel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown, mapOrderTypesToItemsDropdown, mappColumnsOrderTransactionToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { useAccountStore } from '../../../stores/AccountStore';
import { useTransactionStore } from '../../../stores/TransactionStore';
import { Row } from '../structure/Row/Row';
import { Cell } from '../structure/Cell/Cell';
import { filtersTransactionSchemas } from '../../../utils/schemas/filtersTransactionSchemas';

interface ModalFiltersTransactionProps {
  isShow: boolean;
  onClose: () => void;
}

export function ModalFiltersTransaction({ isShow, onClose }: ModalFiltersTransactionProps) {

  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();
  const { filters, ordernation, setFiltersOptions, setOrdernation } = useTransactionStore();

  const { control, reset, watch } = useForm({
    resolver: zodResolver(filtersTransactionSchemas),
    defaultValues: {
      movementType: filters.movementType || [],
      categories: filters.categories || [],
      accounts: filters.accounts || [],
      orderColumn: ordernation.orderColumn,
      orderType: ordernation.orderType
    }
  })

  const handleClose = () => {
    reset();
    setFiltersOptions([], [], []);
    onClose();
  }

  const handleFilter = () => {
    const fields = watch();
    setFiltersOptions(fields.movementType, fields.categories, fields.accounts);
    setOrdernation(fields.orderColumn, fields.orderType);
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
              labelText=''
              control={control}
              items={mapCategoriesToItemsDropdown(categories)}
              name='categories'
              multiple={true}
              zIndexInverse={2000}
              zIndex={3000}
              placeholder='Categorias...'
            />
            <PickerWithTopLabel
              labelText=''
              control={control}
              items={mapAccountsToItemsDropdown(accounts)}
              name='accounts'
              multiple={true}
              zIndexInverse={1000}
              zIndex={2000}
              placeholder='Contas...'
            />
            <PickerWithTopLabel
              labelText=''
              placeholder='Tipos de Lançamentos...'
              control={control}
              items={mapMovementTypesToItemsDropdown()}
              name='movementType'
              multiple={true}
              zIndex={900}
              zIndexInverse={500}
            />
            <Text style={[styles.inputsTitle, { marginTop: 5 }]}>Ordenação</Text>
            <Row>
              <Cell>
                <PickerWithTopLabel
                  labelText=''
                  placeholder='Coluna...'
                  control={control}
                  items={mappColumnsOrderTransactionToItemsDropdown()}
                  name='orderColumn'
                  multiple={false}
                  zIndexInverse={250}
                />
              </Cell>
              <Cell>
                <PickerWithTopLabel
                  labelText=''
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