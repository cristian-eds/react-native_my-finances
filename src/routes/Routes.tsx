import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigationRoutes } from './AuthStackNavigation.routes';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../context/UserContext';
import { PrincipalStackNavigationRoutes } from './PrincipalStackNavigation.routes';
import { DrawerNagivationRoutes } from './Drawer/DrawerNavigation.routes';

export function Routes() {

  const context = useContext(UserContext);

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      {context?.user ? <DrawerNagivationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}