import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './TransactionStatisticsScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';
import { SelectAccount } from '../../components/SelectAccount/SelectAccount';
import { ButtonBack } from '../../components/buttons/ButtonBack/ButtonBack';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PrincipalStackParamList } from '../../routes/Stack/types/PrincipalStackParamList';
import { PeriodFilter } from '../../components/PeriodFilter/PeriodFilter';
import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { CustomBarChart } from '../../components/charts/BarChart/CustomBarChart';

export function TransactionStatistics() {

    const navigation = useNavigation<StackNavigationProp<PrincipalStackParamList>>();

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
                <Text>Período</Text>
                <View style={{ flexDirection: 'row' }}>
                    <PeriodFilter />
                </View>
            </View>
            <View>
                <View style={styles.captionItem}>
                    <Text style={styles.captionItemText}>Créditos</Text>
                    <ButtonPlus />
                </View>
                <CustomBarChart />
            </View>
        </View>
    );
}