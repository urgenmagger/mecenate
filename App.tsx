import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';
import { QueryProvider } from './src/api/providers/QueryProvider';
import { StoreProvider } from './src/stores/StoreContext';
import { FeedScreen } from './src/screens/Feed/FeedScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider>
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <FeedScreen />
      </SafeAreaProvider>
    </QueryProvider>
    </StoreProvider>
  );
}
