import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabBottomNavigationRoutes } from './TabBottomNavigation.routes';
import { AuthStackNavigationRoutes } from './AuthStackNavigation.routes';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../context/UserContext';

export function Routes() {

  const context = useContext(UserContext);

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      {context?.user ? <TabBottomNavigationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}