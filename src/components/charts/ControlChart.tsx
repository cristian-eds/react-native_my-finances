import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './ControlChartStyles';
import { formaterNumberToBRL } from '../../utils/NumberFormater'
import { Row } from '../modals/structure/Row/Row';
import { MovementType, textMovementType } from '../../domain/enums/movementTypeEnum';

import Ionicons from '@expo/vector-icons/Ionicons';
import { CustomBarChart } from './BarChart/CustomBarChart';
import { CustomPieChart } from './PieChart/CustomPieChart';

export interface ChartItem {
    value: number,
    label: string,
    frontColor: string
}

interface ControlChartProps {
    items: ChartItem[],
    activeMovementType: MovementType | null
}

type TypeChart = 'BAR' | 'PIE'

export function ControlChart({ activeMovementType, items }: ControlChartProps) {

    const [typeChartActive, setTypeChartActive] = useState<TypeChart>('BAR');

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
            <Text style={styles.headerChartTitle}>{textMovementType(activeMovementType)}</Text>
            {renderTypesChart()}
        </View>
    )

    const renderTypesChart = () => {
        const renderType = (type: TypeChart) => {
            const isActive = typeChartActive === type;
            const iconName = `${type.toLocaleLowerCase()}-chart${!isActive ? '-outline' : ''}` as keyof typeof Ionicons.glyphMap;
            return (
                <TouchableOpacity onPress={() => setTypeChartActive(type)} >
                    <Ionicons name={iconName} size={isActive ? 22 : 20} color={isActive ? '#072b79ff' : '#575757ff'} style={{ top: -3 }} />
                </TouchableOpacity>
            )
        }

        return (
            <Row>
                {renderType('BAR')}
                {renderType('PIE')}
            </Row>
        )
    }



    const convertToPieChartItems = () => {
        return items.map(item => {
            return {
                value: item.value,
                color: item.frontColor
            }
        })
    }

    const renderChart = () => {
        switch (typeChartActive) {
            case 'BAR':
                return <CustomBarChart items={items} />
            default:
                return <CustomPieChart items={convertToPieChartItems()} />
        }
    }

    return (
        <View style={styles.container}>
            {renderHeaderChart()}
            {renderChart()}
            <View style={styles.footerTotal}>
                <Text style={[styles.footerTitles, { marginBottom: 10 }]}>TOTAIS: </Text>
                <ScrollView horizontal>
                    <View style={{flexWrap: 'wrap', height: 100, columnGap: 5}}>
                        {renderTotals()}
                    </View>
                </ScrollView>
                {renderGeneralTotal()}
            </View>
        </View>
    );
}