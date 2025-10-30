import React from 'react';
import { View } from 'react-native';

import { styles } from './ModalFooterStyles';

export function ModalFooter({children}: React.PropsWithChildren<{}>) {
  return (
    <View style={styles.footer}>
        {children}
    </View>
  );
}