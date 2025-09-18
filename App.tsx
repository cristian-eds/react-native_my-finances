import { Routes } from './src/routes/Routes';
import { DatabaseProvider } from './src/database/DatabaseProvider';
import { UserProvider } from './src/context/UserContext';

export default function App() {
  return (
    <DatabaseProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </DatabaseProvider>
  );
}
