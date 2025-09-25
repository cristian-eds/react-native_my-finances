import React from 'react';
import { Text, View } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './HomeScreenStyles';
import { styles as GlobalStyles } from '../../styles/GlobalStyles';

import { CardAccount } from '../../components/CardAccount/CardAccount';
import { ButtonPlus } from '../../components/buttons/ButtonPlus/ButtonPlus';
import { Table } from '../../components/Table/Table';

export function HomeScreen() {
    return (
        <View style={GlobalStyles.container_screens_normal}>
            <CardAccount></CardAccount>
            <View style={styles.transactions}>
                <View style={styles.transactions_infos}>
                    <View style={styles.transactions_infos_item}>
                        <View style={{ flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
                            <Text style={styles.transactions_infos_h1}>Lançamentos</Text>
                            <MaterialIcons name="leaderboard" size={24} color="black" />
                        </View>
                        <ButtonPlus />
                    </View>
                    <View style={styles.transactions_infos_item}>
                        <Text style={styles.transactions_infos_h2}>Período</Text>
                        <Text style={styles.transactions_infos_h2}>Set-2025</Text>
                    </View>
                    <View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Créditos</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Débitos</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                        <View style={styles.transactions_infos_item}>
                            <Text style={styles.transactions_infos_h3}>Transferência</Text>
                            <Text style={styles.transactions_infos_h3}>R$ 200,00</Text>
                        </View>
                    </View>

                </View>
                <View>

                </View>
            </View>
            <Table flexArray={[1,2,3,]}/>
        </View>
    );
}