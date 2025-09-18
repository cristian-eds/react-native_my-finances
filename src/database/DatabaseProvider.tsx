import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { intilizeDatabase } from './initializeDatabase';


export function DatabaseProvider({ children }: { children: React.ReactNode }) {
   return (
    <SQLiteProvider databaseName="myfinances.db" onInit={intilizeDatabase}>
      {children}
    </SQLiteProvider>
  )
}
