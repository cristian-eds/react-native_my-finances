import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabBottomNavigationRoutes } from './TabBottomNavigation.routes';

export function routes() {
  return (
    <NavigationContainer>
        <TabBottomNavigationRoutes />
    </NavigationContainer>
  );
}