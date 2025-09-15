import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabBottomNavigationRoutes } from './TabBottomNavigation.routes';
import { AuthStackNavigationRoutes } from './AuthStackNavigation.routes';
import { StatusBar } from 'expo-status-bar';

export function Routes() {

  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      {isLogged ? <TabBottomNavigationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}