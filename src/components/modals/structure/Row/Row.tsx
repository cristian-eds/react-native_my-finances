import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';


export function Row({children}:PropsWithChildren) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', columnGap: 10}}>
        {children}
    </View>
  );
}