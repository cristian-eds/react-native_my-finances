import React, { useState } from 'react';
import { Modal, View } from 'react-native';

import { styles } from './ModalInstallmentsStyles';
import { Row } from '../structure/Row/Row';
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

export interface Item {
    sequencyItem: number;
    dueDate: Date;
    value: number;
    description: string;
}

interface InstallmentProps {
    isShow?: boolean;
    onClose: () => void;
    items: Item[];
}

export function ModalInstallments({ items, isShow, onClose }: InstallmentProps) {

    const [controlledItems, setControlledItems] = useState<Item[]>(items);

    const handleUpdateItem = (updatedItem: Item) => {
        const updatedItems = controlledItems.map(item => 
            item.sequencyItem === updatedItem.sequencyItem ? updatedItem : item
        );
        setControlledItems(updatedItems);
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
                    <Row key={0} style={styles.headerItems}>
                        <Text>#</Text>
                        <Text>Descrição</Text>
                        <Text>Vencimento</Text>
                        <Text>Valor</Text>
                    </Row>
                    <View style={{ maxHeight: 300 }}>
                        <FlatList
                            data={controlledItems}
                            renderItem={({ item }) => <InstallmentItem item={item} updateItem={handleUpdateItem}/>}
                            keyExtractor={(item) => item.sequencyItem.toString()}

                        />
                    </View>
                    <ModalFooter>
                        <ButtonPrincipal title='Gerar parcelas' onPress={onClose} style={{ backgroundColor: '#e3e3e3ff', marginBottom: 10 }} iconName='checkmark-done'/>
                    </ModalFooter>
                </ModalContent>
            </ModalContainer>
        </Modal>
    );
}