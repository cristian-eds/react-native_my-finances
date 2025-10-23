import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './TransactionStatisticsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { SelectAccount } from '../../components/SelectAccount/SelectAccount';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import {  ChartItem, CustomBarChart } from '../../components/charts/BarChart/CustomBarChart';
import { useTransactionStore } from '../../stores/TransactionStore';
import { MovementType } from '../../domain/enums/movementTypeEnum';
import { useCategoryStore } from '../../stores/CategoryStore';

type GroupChartItem = {
    [category: number]: ChartItem
}

export function TransactionStatistics() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
    const { transactions } = useTransactionStore();
    const { categories } = useCategoryStore();
    const [activeMovementType, setActiveMovementType] = useState(MovementType.Despesa);

    const mapTransactionToChartItem = (type: MovementType) => {
        const transactionsFiltered = transactions.filter(transaction => transaction.movementType === type);
        
        const items = transactionsFiltered.reduce((acumulator, transaction) => {
            const actualCategory = transaction.categoryId as number;
            const foundedCategory = categories.find(cat => cat.id === transaction.categoryId);

            if(!acumulator[actualCategory]) {
                acumulator[actualCategory] = {
                    frontColor: foundedCategory?.hexColor ?? '#4770eaff',
                    label: foundedCategory?.description ?? ' ',
                    value: 0
                }
            }

            acumulator[actualCategory].value += transaction.value

            return acumulator;

        },{}  as GroupChartItem,)

       return Object.values(items);
    }

    const textTitle = () => {
        switch (activeMovementType) {
            case MovementType.Despesa:
                return 'Débitos'
            case MovementType.Receita:
                return 'Créditos'
            default:
                return 'Transferências'
        }
    }

    const renderCaptionMovementType = (movementType: MovementType, title: string) => {
        const isActive = activeMovementType === movementType;
        return (
            <TouchableOpacity
                onPress={() => setActiveMovementType(movementType)}
                style={[styles.captionMovementTypeItem, isActive && styles.captionMovementTypeItemActive]}>
                <Text style={[styles.captionMovementTypeItemText, isActive && styles.captionMovementTypeItemTextActive]}>{title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={GlobalStyles.container_screens_normal}>
            <View style={styles.header}>
                <ButtonBack onPress={() => navigation.goBack()} />
                <View style={{ width: '50%' }}>
                    <Text style={styles.headerAccountText}>Conta</Text>
                    <SelectAccount containerStyle={{ width: '100%' }} labelStyle={{ textAlign: 'right' }} />
                </View>
            </View>
            <View style={styles.period}>
                <View style={{ flexDirection: 'row' }}>
                    <PeriodFilter />
                </View>
            </View>
            <View style={styles.chart}>
                <View style={styles.sectionChartHeader}>
                    <Text style={styles.sectionChartHeaderText}>{textTitle()}</Text>
                    <ButtonPlus />
                </View>
                <CustomBarChart items={mapTransactionToChartItem(activeMovementType)} />
            </View>
            <View style={styles.captionMovementType}>
                {renderCaptionMovementType(MovementType.Despesa, 'Débitos')}
                {renderCaptionMovementType(MovementType.Receita, 'Créditos')}
                {renderCaptionMovementType(MovementType.Transferencia, 'Transfêrencia')}
            </View>
        </View>
    );
}