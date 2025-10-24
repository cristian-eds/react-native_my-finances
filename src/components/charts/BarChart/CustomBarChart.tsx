import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { ChartItem } from '../ControlChart';
import { Dimensions } from 'react-native';
import { formaterNumberToBRL } from '../../../utils/NumberFormater';

interface CustomBarChartProps {
    items: ChartItem[],
}

const screenWidth = Dimensions.get('window').width;

export function CustomBarChart({ items }: CustomBarChartProps) {

    const barCount = items.length;
    const chartWidth = screenWidth - 160;
    const fixedBarWidth = 30;
    const totalSpaceBars = fixedBarWidth * barCount;
    const spaceRemaining = chartWidth - totalSpaceBars;
    const spacing = spaceRemaining / (barCount + 1)
    const STEP = 4;

    const formatYLabel = (value: string) => {
        const number = Number(value);
        return formaterNumberToBRL(number);
    }

    const calculateMaxChartValue = (maxItemValue: number, step: number, baseMultiple: number) => {
        const nextMultiple = Math.ceil(maxItemValue / step / baseMultiple) + 1;
        return nextMultiple * step * baseMultiple;
    }

    const maxItemValue = items.reduce((prevItem, currentValue) => currentValue.value > prevItem ? currentValue.value : prevItem, 0);
    const maxChartValue = calculateMaxChartValue(maxItemValue, STEP, 10)

    return (
        <BarChart
            data={items}
            barWidth={fixedBarWidth}
            yAxisTextStyle={{ color: '#555', fontSize: 12, textAlign: 'left', fontWeight: '500' }}
            yAxisLabelContainerStyle={{ justifyContent: 'flex-end', paddingRight: 5 }}
            yAxisLabelWidth={72}
            showYAxisIndices
            width={chartWidth}
            height={120}
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
    );
}