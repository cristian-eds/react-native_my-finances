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
import { useParameterStore } from '../../../stores/ParameterStore';
import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';

interface ModalParametersProps {
    isShow: boolean,
    onClose: () => void
}

export function ModalParameters({ isShow, onClose }: ModalParametersProps) {

    const { accounts, activeAccount, setActiveAccount } = useAccountStore();
    const { categories } = useCategoryStore();
    const { parameters, updateParameters } = useParameterStore();
    const database = useSQLiteContext();

    const [deafultActiveAccount, setDeafultActiveAccount] = useState<string>(parameters.defaultActiveAccountId?.toString() || '');
    const [transacationDefaultAccount, setTransacationDefaultAccount] = useState<string>(parameters.transactionDefaultAccountId?.toString() || '');

    const [transactionDefaultCategoryExit, setTransactionDefaultCategoryExit] = useState<string>(parameters.transactionDefaultCategoryExitId?.toString() || '');
    const [transactionDefaultCategoryEntry, setTransactionDefaultCategoryEntry] = useState<string>(parameters.transactionDefaultCategoryEntryId?.toString() || '');
    const [transactionDefaultCategoryTransfer, setTransactionDefaultCategoryTransfer] = useState<string>(parameters.transactionDefaultCategoryTransferId?.toString() || '');

    const accountItems = [{label: 'Nenhum', value: 0}, ...mapAccountsToItemsDropdown(accounts)];
    const categoriesItems = [{label: 'Nenhum', value: 0}, ...mapCategoriesToItemsDropdown(categories)];

    const handleConfirm = async () => {
        const updatedParameters = {
            ...parameters,
            defaultActiveAccountId: deafultActiveAccount ? parseInt(deafultActiveAccount) : undefined,
            transactionDefaultAccountId: transacationDefaultAccount ? parseInt(transacationDefaultAccount) : undefined,
            transactionDefaultCategoryExitId: transactionDefaultCategoryExit ? parseInt(transactionDefaultCategoryExit) : undefined,
            transactionDefaultCategoryEntryId: transactionDefaultCategoryEntry ? parseInt(transactionDefaultCategoryEntry) : undefined,
            transactionDefaultCategoryTransferId: transactionDefaultCategoryTransfer ? parseInt(transactionDefaultCategoryTransfer) : undefined,
        };
        const updated = await updateParameters(updatedParameters, database);

        if(updated){
            if(activeAccount?.id !== updatedParameters.defaultActiveAccountId && updatedParameters.defaultActiveAccountId !== 0){
                const newActiveAccount = accounts.find(acc => acc.id === updatedParameters.defaultActiveAccountId);
                if(newActiveAccount){
                    setActiveAccount(newActiveAccount);
                }
            }
            Alert.alert("Sucesso","Parâmetros atualizados com sucesso!");
            onClose();
        }
    }

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
                                        value={deafultActiveAccount}
                                        setValue={setDeafultActiveAccount}
                                        enableItemsToDrop={accountItems}
                                        placeholder='Selecione'
                                        zIndex={5000}
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
                                        zIndex={4000}
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
                        <ButtonIconAction iconName='checkmark-sharp' onPress={handleConfirm} mode={Mode.CONFIRM} />
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}