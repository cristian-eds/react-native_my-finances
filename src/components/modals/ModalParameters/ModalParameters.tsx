import React, { useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { ModalContainer } from '../structure/ModalContainer/ModalContainer';
import { ModalHeader } from '../structure/ModalHeader/ModalHeader';
import { ButtonBack } from '../../buttons/ButtonBack/ButtonBack';
import { ModalContent } from '../structure/ModalContent/ModalContent';

import { styles } from './ModalParametersStyles';
import { Spacer } from '../../Spacer/Spacer';
import { Row } from '../../structure/Row/Row';
import { Ionicons } from '@expo/vector-icons';
import { ModalFooter } from '../structure/ModalFooter/ModalFooter';
import { ButtonIconAction, Mode } from '../../buttons/ButtonConfirm/ButtonIconAction';
import { useAccountStore } from '../../../stores/AccountStore';
import { useCategoryStore } from '../../../stores/CategoryStore';
import { CustomDropdown } from '../../CustomDropdown/CustomDropdown';
import { Cell } from '../../structure/Cell/Cell';
import { mapAccountsToItemsDropdown, mapCategoriesToItemsDropdown } from '../../../utils/mappers/itemsPickerMapper';

interface ModalParametersProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalParameters({ isShow, onClose }: ModalParametersProps) {

    const { accounts } = useAccountStore();
    const { categories } = useCategoryStore();

    const [homeDefaultAccount, setHomeDefaultAccount] = useState<string>('');
    const [transacationDefaultAccount, setTransacationDefaultAccount] = useState<string>('');

    const [transactionDefaultCategoryExit, setTransactionDefaultCategoryExit] = useState<string>('');
    const [transactionDefaultCategoryEntry, setTransactionDefaultCategoryEntry] = useState<string>('');
    const [transactionDefaultCategoryTransfer, setTransactionDefaultCategoryTransfer] = useState<string>('');

    const accountItems = mapAccountsToItemsDropdown(accounts);
    const categoriesItems = mapCategoriesToItemsDropdown(categories);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isShow}
            statusBarTranslucent={true}
        >
            <ModalContainer>
                <ModalContent>
                    <ModalHeader>
                        <ButtonBack onPress={onClose} />
                        <Row style={{ flex: 4, justifyContent: 'center' }}>
                            <Ionicons name="options-outline" size={18} color="green" style={{ top: -3 }} />
                            <Text style={styles.headerTitle}>Parâmetros</Text>
                        </Row>
                        <Spacer />
                    </ModalHeader>
                    <View style={{ rowGap: 20, marginTop: 5 }}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Contas padrão</Text>
                            <Row>
                                <Text style={styles.itemText}>Tela Home:</Text>
                                <Cell flex={3}>
                                    <CustomDropdown
                                        value={homeDefaultAccount}
                                        setValue={setHomeDefaultAccount}
                                        enableItemsToDrop={accountItems}
                                        placeholder='Selecione'
                                        zIndex={2000}
                                        zIndexInverse={100}
                                    />
                                </Cell>
                            </Row>
                            <Row>
                                <Text style={styles.itemText}>Para Transações:</Text>
                                <Cell flex={3}>
                                    <CustomDropdown
                                        value={transacationDefaultAccount}
                                        setValue={setTransacationDefaultAccount}
                                        enableItemsToDrop={accountItems}
                                        placeholder='Selecione'
                                        zIndex={1000}
                                        zIndexInverse={100}
                                    />
                                </Cell>
                            </Row>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Categorias padrão</Text>
                            <Row>
                                <Text style={styles.itemText}>Para Saídas:</Text>
                                <Cell flex={3}>
                                    <CustomDropdown
                                        value={transactionDefaultCategoryExit}
                                        setValue={setTransactionDefaultCategoryExit}
                                        enableItemsToDrop={categoriesItems}
                                        placeholder='Selecione'
                                        zIndex={3000}
                                        zIndexInverse={100}
                                    />
                                </Cell>
                            </Row>
                            <Row >
                                <Text style={styles.itemText}>Para Entradas:</Text>
                                <Cell flex={3}>
                                    <CustomDropdown
                                        value={transactionDefaultCategoryEntry}
                                        setValue={setTransactionDefaultCategoryEntry}
                                        enableItemsToDrop={categoriesItems}
                                        placeholder='Selecione'
                                        zIndex={2000}
                                        zIndexInverse={200}
                                    />
                                </Cell>
                            </Row>
                            <Row>
                                <Text style={styles.itemText}>Para Transferências:</Text>
                                <Cell flex={3}>
                                    <CustomDropdown
                                        value={transactionDefaultCategoryTransfer}
                                        setValue={setTransactionDefaultCategoryTransfer}
                                        enableItemsToDrop={categoriesItems}
                                        placeholder='Selecione'
                                        zIndex={1000}
                                        zIndexInverse={300}
                                    />
                                </Cell>
                            </Row>
                        </View>
                    </View>
                    <ModalFooter>
                        <ButtonIconAction iconName='close' onPress={onClose} />
                        <ButtonIconAction iconName='checkmark-sharp' onPress={() => { }} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}