import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface CellProps {
    flex?: number
}

export function Cell({flex = 1, children} : PropsWithChildren<CellProps>) {
  return (
    <View style={{ flex: flex }}>
        {children}
    </View>
  );
}