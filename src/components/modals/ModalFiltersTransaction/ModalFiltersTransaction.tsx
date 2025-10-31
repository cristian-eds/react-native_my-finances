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
import { filtersSchemas } from '../../../utils/schemas/filtersSchemas';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown, mapMovementTypesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { useAccountStore } from '../../../stores/AccountStore';
import { useTransactionStore } from '../../../stores/TransactionStore';

interface ModalFiltersTransactionProps {
  isShow: boolean;
  onClose: () => void;
}

export function ModalFiltersTransaction({ isShow, onClose }: ModalFiltersTransactionProps) {

  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();
  const { filters,setFiltersOptions } = useTransactionStore();

  const { control, reset, watch } = useForm({
    resolver: zodResolver(filtersSchemas),
    defaultValues: {
      movementType: filters.movementType || [],
      categories: filters.categories || [],
      accounts: filters.accounts || []
    }
  })

  const handleClose = () => {
    reset();
    setFiltersOptions(undefined, undefined, undefined);
    onClose();
  }

  const handleFilter = () => {
    const filters = watch();
    setFiltersOptions(filters.movementType, filters.categories, filters.accounts);
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
            <Text style={styles.title}>Filtros de Lançamentos</Text>
            <Spacer />
          </ModalHeader>
          <View style={styles.body}>
            <PickerWithTopLabel
              labelText='Categorias'
              control={control}
              items={mapCategoriesToItemsDropdown(categories)}
              name='categories'
              multiple={true}
              zIndexInverse={2000}
              zIndex={3000}
              />
            <PickerWithTopLabel
              labelText='Contas'
              control={control}
              items={mapAccountsToItemsDropdown(accounts)}
              name='accounts'
              multiple={true} 
              zIndexInverse={1000}
              zIndex={2000}
              />
            <PickerWithTopLabel
              labelText='Tipos de Lançamento'
              control={control}
              items={mapMovementTypesToItemsDropdown()}
              name='movementType'
              multiple={true} 
              zIndexInverse={500}
              />
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