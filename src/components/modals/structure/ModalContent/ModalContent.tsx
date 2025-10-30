import React from 'react';
import { View } from 'react-native';

import { styles } from './ModalContentStyles';

export function ModalContent({children}: React.PropsWithChildren<{}>) {
  return (
    <View style={styles.containerContent}>
        {children}
    </View>
  );
}