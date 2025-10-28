import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigationRoutes } from './Stack/AuthStack/AuthStackNavigation.routes';
import { StatusBar } from 'expo-status-bar';
import { UserContext } from '../context/UserContext';
import { DrawerNagivationRoutes } from './Drawer/DrawerNavigation.routes';

export function Routes() {

  const context = useContext(UserContext);

  return (
    <NavigationContainer >
      <StatusBar backgroundColor='#e0e0e0a6' style='light' />
      {context?.user ? <DrawerNagivationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}