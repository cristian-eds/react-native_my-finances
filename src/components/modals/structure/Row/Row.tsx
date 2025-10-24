import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

interface RowProps {
  style?: ViewStyle
}

export function Row({style, children}:PropsWithChildren<RowProps>) {
  return (
    <View style={[{flexDirection: 'row', justifyContent: 'space-between', columnGap: 10, alignItems: 'center'}, style]}>
        {children}
    </View>
  );
}