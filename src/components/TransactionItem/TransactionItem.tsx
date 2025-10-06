import React from 'react';
import { View, Text, TextStyle } from 'react-native';

import { styles } from './TransactionItemStyles';

import Ionicons from '@expo/vector-icons/Ionicons';

import { HomeTableItem } from '../../domain/homeTableItem';
import { MovementType } from '../../domain/enums/movementTypeEnum';

interface TransactionItemProps {
    item: HomeTableItem
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

    const ICON_MAP: IconMapStructure = {
        prefix: {
            [MovementType.Despesa]: { name: 'remove', color: 'red' },
            [MovementType.Transferencia]: { name: 'swap-horizontal-outline', color: 'blue' },
            default: { name: 'add', color: 'green' },
        },
        suffix: {
            [MovementType.Despesa]: { name: 'trending-down', color: 'red' },
            [MovementType.Receita]: { name: 'trending-up', color: 'green' },
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
                <Text style={[styles.value_info_text, ICON_MAP.stylesText[item.movementType]]}>{item.value}</Text>
                {renderSufixIcon(item.movementType)}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.iconBox}>
                <Ionicons name="cart-outline" size={30} color="black" />
            </View>
            <View style={styles.central_info}>
                <Text style={styles.central_info_description}>{item.description}</Text>
                <Text style={styles.central_info_data}>{item.data}</Text>
            </View>
            {renderValueInfo()}
        </View>
    );
}