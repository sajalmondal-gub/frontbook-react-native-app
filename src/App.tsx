import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './hooks/useAuth';
import RootNavigator from './navigation/RootNavigator';
import { ScrollProvider } from './contexts/ScrollContext';
import { DrawerProvider } from './contexts/DrawerContext';
import DrawerMenu from './components/DrawerMenu';

function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ScrollProvider>
          <DrawerProvider>
            <RootNavigator />
            <DrawerMenu />
          </DrawerProvider>
        </ScrollProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
