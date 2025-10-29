import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigationRoutes } from './Stack/AuthStack/AuthStackNavigation.routes';
import { StatusBar } from 'expo-status-bar';
import { DrawerNagivationRoutes } from './Drawer/DrawerNavigation.routes';
import { useUserContext } from '../hooks/useUserContext';
import { useAccountStore } from '../stores/AccountStore';
import { useCategoryStore } from '../stores/CategoryStore';
import { useSQLiteContext } from 'expo-sqlite';

export function Routes() {

  const {user} = useUserContext();

  const {fetchAccounts} = useAccountStore();
  const {fetchCategories} = useCategoryStore();

  const database = useSQLiteContext();

  useEffect(() => {
    const fetch = async () => {
      await fetchCategories(Number(user?.id), database);
      await fetchAccounts(Number(user?.id), database);
    }
    fetch();

  }, [user])

  return (
    <NavigationContainer >
      <StatusBar backgroundColor='#e0e0e0a6' style='light' />
      {user ? <DrawerNagivationRoutes /> : <AuthStackNavigationRoutes />}
    </NavigationContainer>
  );
}