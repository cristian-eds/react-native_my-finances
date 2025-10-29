import React, { useState } from 'react';
import { View, Text, TextStyle } from 'react-native';

import { styles } from './TransactionItemStyles';

import Ionicons from '@expo/vector-icons/Ionicons';

import { TransactionItemData } from '../../domain/transactionItemData';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { ModalTransaction } from '../modals/ModalTransaction/ModalTransaction';
import { useTransactionStore } from '../../stores/TransactionStore';
import { TouchableOpacity } from 'react-native';
import { useCategoryStore } from '../../stores/CategoryStore';
import { useAccountStore } from '../../stores/AccountStore';
import { Row } from '../modals/structure/Row/Row';
import { Cell } from '../modals/structure/Cell/Cell';
import { formaterIsoDateToDefaultPatternWithTime } from '../../utils/DateFormater';
import { formaterNumberToBRL } from '../../utils/NumberFormater';

interface TransactionItemProps {
    item: TransactionItemData
}

interface IconConfig {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
}

interface IconMapStructure {
    prefix: Partial<Record<MovementType, IconConfig>> & { default: IconConfig };
    suffix: Partial<Record<MovementType, IconConfig>>;
    stylesText: Partial<Record<MovementType, TextStyle>>;
}


export function TransactionItem({ item }: TransactionItemProps) {

    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const { activeAccount, accounts } = useAccountStore();


    const ICON_MAP: IconMapStructure = {
        prefix: {
            [MovementType.Despesa]: { name: 'remove', color: 'red' },
            [MovementType.Transferencia]: item?.destinationAccountId !== activeAccount?.id ? { name: 'remove', color: 'red' } : { name: 'add', color: 'green' },
            default: { name: 'add', color: 'green' },
        },
        suffix: {
            [MovementType.Despesa]: { name: 'trending-down', color: 'red' },
            [MovementType.Receita]: { name: 'trending-up', color: 'green' },
            [MovementType.Transferencia]: { name: 'swap-horizontal-outline', color: 'blue' },
        },
        stylesText: {
            [MovementType.Despesa]: { color: 'red' },
            [MovementType.Receita]: { color: 'green' },
        }
    };

    const renderIcon = (iconProps: { name: keyof typeof Ionicons.glyphMap, color: string }) => (
        <Ionicons
            name={iconProps.name}
            size={16}
            color={iconProps.color}
        />
    );

    const renderPrefixIcon = (movementType: MovementType) => {
        const iconConfig =
            ICON_MAP.prefix[movementType] ||
            ICON_MAP.prefix.default;

        return renderIcon(iconConfig);
    };

    const renderSufixIcon = (movementType: MovementType) => {
        const iconConfig = ICON_MAP.suffix[movementType];
        if (iconConfig) {
            return renderIcon(iconConfig);
        }
        return null;
    };

    const renderValueInfo = () => {
        return (
            <View style={styles.value_info}>
                {renderPrefixIcon(item.movementType)}
                <Text style={[styles.value_info_text, ICON_MAP.stylesText[item.movementType]]}>{formaterNumberToBRL(item.value)}</Text>
                {renderSufixIcon(item.movementType)}
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => setShowModalTransaction(true)}>
            <View style={[styles.iconBox, { backgroundColor: item.categoryHexColor ?? '#000' }]}>
                <Ionicons name={item.categoryIconName ?? 'cart-outline'} size={18} color="white" />
            </View>
            <Cell>
                <Row>
                    <Text style={styles.central_info_description}>{item.description}</Text>
                    <Text style={styles.central_info_data}>{formaterIsoDateToDefaultPatternWithTime(item.paymentDate)}</Text>
                </Row>
                <Row>
                    <Text>{item.accountName}</Text>
                    {renderValueInfo()}
                </Row>
            </Cell>

            {showModalTransaction && <ModalTransaction transactionData={item} isShow={showModalTransaction} onClose={() => setShowModalTransaction(false)} mode='edit' />}
        </TouchableOpacity>
    );
}