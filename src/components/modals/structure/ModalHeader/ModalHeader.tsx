import React from 'react';
import { View } from 'react-native';

import { styles } from './ModalHeaderStyles';

export function ModalHeader({children}: React.PropsWithChildren<{}>) {
  return (
    <View style={styles.header}>
        {children}
    </View>
  );
}