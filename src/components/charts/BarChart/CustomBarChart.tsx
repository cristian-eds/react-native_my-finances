import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { styles } from './CustomBarChartStyles';
import { BarChart } from 'react-native-gifted-charts';
import { formaterNumberToBRL } from '../../../utils/NumberFormater';
import { Row } from '../../modals/structure/Row/Row';

const screenWidth = Dimensions.get('window').width;

export interface ChartItem {
    value: number,
    label: string,
    frontColor: string
}

interface CustomBarChartProps {
    items: ChartItem[]
}

export function CustomBarChart({ items }: CustomBarChartProps) {

    const barCount = items.length;
    const chartWidth = screenWidth - 160;
    const fixedBarWidth = 36;
    const totalSpaceBars = fixedBarWidth * barCount;
    const spaceRemaining = chartWidth - totalSpaceBars;
    const spacing = spaceRemaining / (barCount + 1)
    const STEP = 4;

    const calculateMaxChartValue = (maxItemValue: number, step: number, baseMultiple: number) => {
        const nextMultiple = Math.ceil(maxItemValue / step / baseMultiple) + 1;
        return nextMultiple * step * baseMultiple;
    }

    const maxItemValue = items.reduce((prevItem, currentValue) => currentValue.value > prevItem ? currentValue.value : prevItem, 0);
    const maxChartValue = calculateMaxChartValue(maxItemValue, STEP, 10)

    const renderTotals = () => {
        return items.map((item, index) => (
            <View style={styles.footerTotalItem} key={index}>
                <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 5}}>
                    <View style={[styles.footerTotalItemColor, {backgroundColor: item.frontColor}]}></View>
                    <Text style={styles.footerText}>{item.label}: </Text>
                </View>
                <Text style={styles.footerText}>{formaterNumberToBRL(item.value)}</Text>
            </View>
        ))
    }

    const renderGeneralTotal = () => (
        <Row style={{marginTop:10}}>
            <Text style={styles.footerTitles}>GERAL:</Text>
            <Text style={styles.footerText}>{formaterNumberToBRL(items.reduce((prev, current) => prev + current.value, 0))}</Text>
        </Row>
    )

    const formatYLabel = (value: string) => {
        const number = Number(value);
        return formaterNumberToBRL(number);
    }


    return (
        <View style={styles.container}>
            <BarChart
                data={items}
                barWidth={fixedBarWidth}
                yAxisTextStyle={{ color: '#555', fontSize: 12, textAlign: 'left', fontWeight: '500' }}
                yAxisLabelContainerStyle={{justifyContent: 'flex-end', paddingRight: 5}}
                yAxisLabelWidth={72}
                showYAxisIndices
                width={chartWidth}
                height={160}
                spacing={spacing}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
                maxValue={maxChartValue}
                noOfSections={4}
                animationDuration={800}
                barBorderRadius={10}
                hideRules
                formatYLabel={formatYLabel}
                

            />
            <View style={styles.footerTotal}>
                <Text style={[styles.footerTitles, {marginBottom: 10}]}>TOTAIS: </Text>
                {renderTotals()}
                {renderGeneralTotal()}
            </View>
        </View>
    );
}