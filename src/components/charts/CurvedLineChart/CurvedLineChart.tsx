import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import { styles } from './CurvedLineChartStyles';
import { CurveType, LineChart, lineDataItem } from 'react-native-gifted-charts';
import { formaterNumberToBRL } from '../../../utils/NumberFormater';

const screenWidth = Dimensions.get('window').width;
const PADDING_HORIZONTAL = 30;
const chartWidth = screenWidth - (PADDING_HORIZONTAL * 2);

interface CurvedLineChartProps {
    data: lineDataItem[],
    data2: lineDataItem[]
}

export function CurvedLineChart({ data, data2 }: CurvedLineChartProps) {

    return (
        <LineChart
            width={chartWidth}
            initialSpacing={30}
            spacing={57}
            maxValue={110}
            noOfSections={4}
            data={data}
            data2={data2}
            curved={true}
            curveType={CurveType.QUADRATIC}
            color="#00a00dff"
            color2="#ff0000ff"
            thickness={2}
            isAnimated
            dataPointsColor1='#0d4500ff'
            dataPointsColor2='#670000da'
            dataPointsRadius={5}
            areaChart
            startFillColor="#15b915de"
            startFillColor2="#e51313da"
            hideOrigin
            yAxisColor="#000000ff"
            yAxisThickness={0}
            yAxisIndicesWidth={30}
            yAxisTextStyle={{ color: 'gray',  fontSize: 12, width: 70, left: 10, backgroundColor: '#fff', textAlign: 'center' }}
            xAxisColor="#a0a0a0"
            xAxisThickness={0}
            xAxisLabelTextStyle={{ color: 'gray', fontSize: 12, fontWeight: 'bold', left: -6 }}
            showVerticalLines
            verticalLinesColor="#e0e0e0"
            startOpacity={1}
            endOpacity={0.3}
            formatYLabel={(label) => formaterNumberToBRL(Number(label))}
        />
    );
}