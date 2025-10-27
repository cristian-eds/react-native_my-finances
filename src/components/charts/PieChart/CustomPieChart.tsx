import React from 'react';

import { PieChart } from 'react-native-gifted-charts';

interface PieChartItem {
  value: number,
  color: string,
  text?: string,
  gradientCenterColor?: string
}

interface CustomBarChartProps {
  items: PieChartItem[]
}

export function CustomPieChart({ items }: CustomBarChartProps) {

  const itemsToChart = items.length > 0 ? items: [{value: 100, color: '#ccccccff', text: 'Sem dados'}]; 

  return (
    <PieChart
      data={itemsToChart}
      radius={60}
    />
  );
}