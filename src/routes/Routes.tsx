import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { TabBottomNavigationRoutes } from './TabBottomNavigation.routes';
import { AuthStackNavigationRoutes } from './AuthStackNavigation.routes';

export function Routes() {

  const [isLogged, setIsLogged] = React.useState(false);

  return (
    <NavigationContainer >
        {isLogged ? <TabBottomNavigationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}