import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { styles } from './CustomBarChartStyles';
import { BarChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

interface Item {
    value: number,
    label: string,
    frontColor: string
}

interface CustomBarChartProps {
    items: Item[]
}

export function CustomBarChart({items}: CustomBarChartProps) {

    const barCount = items.length;
    const CHART_WIDTH = screenWidth - 160;
    const FIXED_BAR_WIDHT = 30;
    const TOTAL_SPACE_BARS = FIXED_BAR_WIDHT * barCount;
    const SPACE_REMAINING = CHART_WIDTH - TOTAL_SPACE_BARS;
    const SPACING = SPACE_REMAINING / (barCount + 1)

    return (
        <View style={styles.container}>
            <BarChart
                data={items}
                barWidth={FIXED_BAR_WIDHT}
                yAxisLabelPrefix='R$ '
                yAxisTextStyle={{ color: '#555', fontSize: 15, textAlign: 'left' }}
                yAxisLabelWidth={70}  
                showYAxisIndices
                width={CHART_WIDTH}
                spacing={SPACING}
                yAxisThickness={0}
                xAxisThickness={0}
                isAnimated
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