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
import { useTransactionStore } from '../../stores/TransactionStore';
import { frontColorByMovementType, MovementType, textMovementType } from '../../domain/enums/movementTypeEnum';
import { useCategoryStore } from '../../stores/CategoryStore';
import { ChartItem, ControlChart } from '../../components/charts/ControlChart';
import { Transaction } from '../../domain/transactionModel';
import { useAccountStore } from '../../stores/AccountStore';

type GroupChartItem = {
    [category: number | string]: ChartItem
}

type GroupChartTransferItem = {
    [accountsKey: number | string]: ChartItem
}

export function TransactionStatistics() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();
    const { transactions } = useTransactionStore();
    const { categories } = useCategoryStore();
    const { getAccountName, activeAccount } = useAccountStore();

    const [activeMovementType, setActiveMovementType] = useState<MovementType | null>(null);

    const generateGeneralChart = (): ChartItem[] => {
        return [
            ...Object.values(MovementType).map(generateChartItemByMovementType)
        ]
    }

    const generateTransferItems = (filterTransactions: Transaction[]): ChartItem[] => {
        const items = filterTransactions.reduce((acumulator, transaction) => {
            const actualAccountsKey = `${transaction.accountId}-${transaction.destinationAccountId}`
            const label = `De: ${getAccountName(transaction.accountId)} - Para: ${getAccountName(transaction.destinationAccountId ?? 0) ?? ' '}`
            const isAccountDestination = activeAccount?.id === transaction.destinationAccountId;
            const frontColor = isAccountDestination ? '#28a326ff' : '#fe5e5eff';

            if (!acumulator[actualAccountsKey]) {
                acumulator[actualAccountsKey] = {
                    frontColor: frontColor,
                    label: label,
                    value: 0,
                    movement: isAccountDestination ? 'CREDIT' : 'DEBIT'
                }
            }

            acumulator[actualAccountsKey].value += transaction.value

            return acumulator;

        }, {} as GroupChartTransferItem)

        return Object.values(items);
    }

    const generateChartItemByMovementType = (movementType: MovementType): ChartItem => {
        return {
            frontColor: frontColorByMovementType(movementType),
            label: textMovementType(movementType),
            value: someTotalValueByMovementType(movementType),
            movement: movementType === MovementType.Despesa ? 'DEBIT' : 'CREDIT'

        }
    }

    const someTotalValueByMovementType = (movementType: MovementType) => {
        return transactions.filter(transaction => transaction.movementType === movementType)
            .reduce((acumulator, current) => acumulator += current.value, 0);
    }

    const mapTransactionToChartItem = (type: MovementType | null) => {
        if (!type) return generateGeneralChart()
        const transactionsFiltered = transactions.filter(transaction => transaction.movementType === type);
        if (type === MovementType.Transferencia) return generateTransferItems(transactionsFiltered);

        const items = transactionsFiltered.reduce((acumulator, transaction) => {
            const actualCategory = transaction.categoryId as number;
            const foundedCategory = categories.find(cat => cat.id === transaction.categoryId);

            if (!acumulator[actualCategory]) {
                acumulator[actualCategory] = {
                    frontColor: foundedCategory?.hexColor ?? '#4770eaff',
                    label: foundedCategory?.description ?? ' ',
                    value: 0,
                    movement: transaction.movementType === MovementType.Despesa ? 'DEBIT' : 'CREDIT'
                }
            }

            acumulator[actualCategory].value += transaction.value

            return acumulator;

        }, {} as GroupChartItem,)

        return Object.values(items);
    }

    const renderCaptionMovementType = (movementType: MovementType, title: string) => {
        const isActive = activeMovementType === movementType;
        return (
            <TouchableOpacity
                onPress={() => setActiveMovementType(prevMovement => movementType === prevMovement ? null : movementType)}
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
                <ControlChart items={mapTransactionToChartItem(activeMovementType)} activeMovementType={activeMovementType} />
            </View>
            <View style={styles.captionMovementType}>
                {renderCaptionMovementType(MovementType.Despesa, 'Débitos')}
                {renderCaptionMovementType(MovementType.Receita, 'Créditos')}
                {renderCaptionMovementType(MovementType.Transferencia, 'Transfêrencia')}
            </View>
        </View>
    );
}