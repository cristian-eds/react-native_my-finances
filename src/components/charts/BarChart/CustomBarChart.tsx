import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { styles } from './CustomBarChartStyles';
import { BarChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

export interface ChartItem {
    value: number,
    label: string,
    frontColor: string
}

interface CustomBarChartProps {
    items: ChartItem[]
}

export function CustomBarChart({items}: CustomBarChartProps) {

    const barCount = items.length;
    const chartWidth = screenWidth - 160;
    const fixedBarWidth = 30;
    const totalSpaceBars = fixedBarWidth * barCount;
    const spaceRemaining = chartWidth - totalSpaceBars;
    const spacing = spaceRemaining / (barCount + 1)
    const STEP = 5;

    const calculateMaxChartValue = (maxItemValue: number, step: number, baseMultiple: number) => {
        const nextMultiple = Math.ceil(maxItemValue / step / baseMultiple) + 1;
        return nextMultiple * step * baseMultiple;
    }

    const maxItemValue = items.reduce((prevItem, currentValue) => currentValue.value > prevItem ? currentValue.value : prevItem,0);
    const maxChartValue = calculateMaxChartValue(maxItemValue, STEP, 10)



    return (
        <View style={styles.container}>
            <BarChart
                data={items}
                barWidth={fixedBarWidth}
                yAxisLabelPrefix='R$ '
                yAxisTextStyle={{ color: '#555', fontSize: 15, textAlign: 'left' }}
                yAxisLabelWidth={70}  
                showYAxisIndices
                width={chartWidth}
                spacing={spacing}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
                maxValue={maxChartValue}
                noOfSections={5}
                animationDuration={800}
                barBorderRadius={10}
                hideRules

            />
            <View style={styles.footerTotal}>
                <Text style={styles.footerText}>Total: </Text>
                <Text style={styles.footerText}>R$ {items.reduce((prev, current) => prev + current.value,0).toFixed(2)}</Text>
            </View>
        </View>
    );
}