import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from './src/api/providers/QueryProvider';
import { FeedScreen } from './src/screens/Feed/FeedScreen';

export default function App() {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <FeedScreen />
      </SafeAreaProvider>
    </QueryProvider>
  );
}
