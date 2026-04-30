import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeedScreen } from '../screens/Feed/FeedScreen';
import { PostDetailScreen } from '../screens/PostDetail/PostDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};
