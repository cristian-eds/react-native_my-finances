import React from 'react';

import { PieChart } from 'react-native-gifted-charts';

interface PieChartItem {
  value: number,
  color: string,
  text?: string,
  gradientCenterColor?: string,
}

interface CustomBarChartProps {
  items: PieChartItem[],
  donut?: boolean
}

export function CustomPieChart({ items, donut = false }: CustomBarChartProps) {

  const itemsToChart = items.length > 0 ? items: [{value: 100, color: '#ccccccff', text: 'Sem dados'}]; 

  return (
    <PieChart
      data={itemsToChart}
      donut={donut}
      radius={60}
      innerCircleColor={'#ffffffff'}
      innerRadius={35}

    />
  );
}