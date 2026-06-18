import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './hooks/useAuth';
import RootNavigator from './navigation/RootNavigator';
import { ScrollProvider } from './contexts/ScrollContext';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ScrollProvider>
          <RootNavigator />
        </ScrollProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
