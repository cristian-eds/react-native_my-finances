import React, { useState } from 'react';
import { View, Text, TextStyle, ViewStyle } from 'react-native';

import { styles } from './TransactionItemStyles';

import Ionicons from '@expo/vector-icons/Ionicons';

import { MovementType } from '../../domain/enums/movementTypeEnum';
import { ModalTransaction } from '../modals/ModalTransaction/ModalTransaction';
import { TouchableOpacity } from 'react-native';
import { useAccountStore } from '../../stores/AccountStore';
import { Row } from '../structure/Row/Row';
import { Cell } from '../structure/Cell/Cell';
import { formaterIsoDateToDefaultPatternWithTime } from '../../utils/DateFormater';
import { formaterNumberToBRL } from '../../utils/NumberFormater';
import { Transaction } from '../../domain/transactionModel';
import { useCategoryStore } from '../../stores/CategoryStore';

interface TransactionItemProps {
    item: Transaction,
    style?: ViewStyle
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


export function TransactionItem({ item, style }: TransactionItemProps) {

    const [showModalTransaction, setShowModalTransaction] = useState(false);
    const { activeAccount, accounts } = useAccountStore();
    const { categories } = useCategoryStore();

    const account = accounts.find(acc => acc.id === item.accountId);
    const category = categories.find(cat => cat.id === item.categoryId)


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
        <TouchableOpacity style={[styles.container, style]} onPress={() => setShowModalTransaction(true)}>
            <View style={[styles.iconBox, { backgroundColor: category?.hexColor ?? '#7596d7ff' }]}>
                <Ionicons name={category?.iconName ?? 'receipt-outline'} size={18} color="white" />
            </View>
            <Cell>
                <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={styles.central_info_description}>{item.description}</Text>
                    <Text style={styles.central_info_data}>{formaterIsoDateToDefaultPatternWithTime(item.paymentDate)}</Text>
                </Row>
                <Row>
                    <Text>{account?.name}</Text>
                    {renderValueInfo()}
                </Row>
            </Cell>

            {showModalTransaction && <ModalTransaction transactionData={item} isShow={showModalTransaction} onClose={() => setShowModalTransaction(false)} mode='edit' />}
        </TouchableOpacity>
    );
}