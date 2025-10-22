import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { styles } from './CustomBarChartStyles';
import { BarChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

export function CustomBarChart() {

    const data = [
        { value: 50, label: 'Rendimento', frontColor: '#177AD5' },
        { value: 90, label: 'Salário', frontColor: '#213547ff' },
        { value: 120, label: 'Rendimento', frontColor: '#646464ff' },
    ]

    const barCount = data.length;
    const CHART_WIDTH = screenWidth - 160;
    const FIXED_BAR_WIDHT = 30;
    const TOTAL_SPACE_BARS = FIXED_BAR_WIDHT * barCount;
    const SPACE_REMAINING = CHART_WIDTH - TOTAL_SPACE_BARS;
    const SPACING = SPACE_REMAINING / (barCount + 1)

    return (
        <View style={styles.container}>
            <BarChart
                data={data}
                barWidth={FIXED_BAR_WIDHT}
                yAxisLabelPrefix='R$ '
                yAxisTextStyle={{ color: '#555', fontSize: 15, textAlign: 'left' }}
                yAxisLabelWidth={70}  
                showYAxisIndices
                width={CHART_WIDTH}
                spacing={SPACING}
                roundedTop
                yAxisThickness={1}
                xAxisThickness={0}
                isAnimated
                noOfSections={5}
                animationDuration={800}
                showValuesAsTopLabel
                barBorderRadius={6}
                
            />
            <View style={styles.footerTotal}>
                <Text>Total: </Text>
                <Text>R$ {data.reduce((prev, current) => prev + current.value,0).toFixed(2)}</Text>
            </View>
        </View>
    );
}