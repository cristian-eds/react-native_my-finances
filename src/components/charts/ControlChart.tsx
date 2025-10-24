import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ControlChartStyles';
import { formaterNumberToBRL } from '../../utils/NumberFormater'
import { Row } from '../modals/structure/Row/Row';
import { MovementType, textMovementType } from '../../domain/enums/movementTypeEnum';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomBarChart } from './BarChart/CustomBarChart';

export interface ChartItem {
    value: number,
    label: string,
    frontColor: string
}

interface ControlChartProps {
    items: ChartItem[],
    activeMovementType: MovementType | null
}

export function ControlChart({ activeMovementType, items }: ControlChartProps) {

    const renderTotals = () => (
        items.map((item, index) => (
            <View style={styles.footerTotalItem} key={index}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                    <View style={[styles.footerTotalItemColor, { backgroundColor: item.frontColor }]}></View>
                    <Text style={styles.footerText}>{item.label}: </Text>
                </View>
                <Text style={styles.footerText}>{formaterNumberToBRL(item.value)}</Text>
            </View>
        ))
    )

    const renderGeneralTotal = () => (
        <Row style={{ marginTop: 10 }}>
            <Text style={styles.footerTitles}>GERAL:</Text>
            <Text style={styles.footerText}>{formaterNumberToBRL(items.reduce((prev, current) => prev + current.value, 0))}</Text>
        </Row>
    )

    const renderHeaderChart = () => (
        <View style={styles.headerChart}>
            <View style={{flex:1}}></View>
            <Text style={styles.headerChartTitle}>{textMovementType(activeMovementType)}</Text>
            {renderTypeChart()}
        </View>
    )

    const renderTypeChart = () => (
        <Row>
            <TouchableOpacity>
                <Ionicons name="bar-chart-outline" size={20} color="black" style={{top: -3}} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons name="pie-chart-outline" size={20} color="black" style={{top: -3}}/>
            </TouchableOpacity>
        </Row>
    )

    return (
        <View style={styles.container}>
            {renderHeaderChart()}
            <CustomBarChart items={items}/>
            <View style={styles.footerTotal}>
                <Text style={[styles.footerTitles, { marginBottom: 10 }]}>TOTAIS: </Text>
                {renderTotals()}
                {renderGeneralTotal()}
            </View>
        </View>
    );
}