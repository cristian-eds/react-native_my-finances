import React from 'react';
import { Dimensions, View } from 'react-native';
import { styles } from './CustomBarChartStyles';
import { BarChart } from 'react-native-gifted-charts';

const screenWidth = Dimensions.get('window').width;

export function CustomBarChart() {

    const data = [
        { value: 50, label: 'Rendimento', frontColor: '#177AD5' },
        { value: 90, label: 'Salário', frontColor: '#177AD5' },
        { value: 120, label: 'Rendimento', frontColor: '#177AD5' },
    ]

    const barWidth = screenWidth - 120;


    return (
        <View style={styles.container}>
            <BarChart
                data={data}
                barWidth={35}
                yAxisLabelPrefix='R$ '
                yAxisTextStyle={{ color: '#555', fontSize: 15, textAlign: 'left' }}
                yAxisLabelWidth={80}  
                showYAxisIndices
                width={screenWidth * 0.9}
                roundedTop
                yAxisThickness={1}
                xAxisThickness={0}
                isAnimated
                noOfSections={5}
                animationDuration={800}
                showValuesAsTopLabel
                barBorderRadius={6}
                
            />
        </View>
    );
}