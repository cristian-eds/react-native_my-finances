import { Routes } from './src/routes/Routes';
import { DatabaseProvider } from './src/database/DatabaseProvider';

export default function App() {
  return (
    <DatabaseProvider>
      <Routes />
    </DatabaseProvider>
  );
}
   