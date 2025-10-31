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
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { useAccountStore } from '../../../stores/AccountStore';

interface ModalFiltersTransactionProps {
  isShow: boolean;
  onClose: () => void;
}

export function ModalFiltersTransaction({ isShow, onClose }: ModalFiltersTransactionProps) {

  const { categories } = useCategoryStore();
  const { accounts } = useAccountStore();

  const { control, reset, watch } = useForm({
    resolver: zodResolver(filtersSchemas),
    defaultValues: {
      movementType: [],
      categories: [],
      accounts: []
    }
  })

  const handleClose = () => {
    reset();
    onClose();
  }

  const handleFilter = () => {
    const filters = watch();
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
            <Text style={styles.title}>Filtros de Lançamentos</Text>
            <Spacer />
          </ModalHeader>
          <View>
            <PickerWithTopLabel
              control={control}
              items={mapCategoriesToItemsDropdown(categories)}
              name='categories'
              multiple={true} />
            <PickerWithTopLabel
              control={control}
              items={mapAccountsToItemsDropdown(accounts)}
              name='accounts'
              multiple={true} />
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