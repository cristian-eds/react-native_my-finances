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

  return (
    <PieChart
      data={items}
      radius={60}
    />
  );
}