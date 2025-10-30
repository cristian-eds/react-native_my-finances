import React from 'react';
import { View } from 'react-native';

import { styles } from './ModalContainerStyles';

export function ModalContainer({children}: React.PropsWithChildren<{}>) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}