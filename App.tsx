import { Routes } from './src/routes/Routes';
import { DatabaseProvider } from './src/database/DatabaseProvider';
import { UserProvider } from './src/context/UserContext';
import { View } from 'react-native';

export default function App() {
  return (
    <DatabaseProvider>
      <UserProvider>
        <View style={{backgroundColor: '#E5EBF1', flex: 1}}>
          <Routes />
        </View>
      </UserProvider>
    </DatabaseProvider>
  );
}
