import { FC } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/StoreContext';
import { PostActionChip } from '../../../common/components/PostActionChip';
import HeartIcon from '../../../assets/icons/heart.svg';
import HeartFilledIcon from '../../../assets/icons/heart-filled.svg';

interface LikeButtonProps {
  postId: string;
  onToggle: (postId: string) => Promise<void>;
}

const TIMING = { duration: 150 };

export const LikeButton: FC<LikeButtonProps> = observer(({ postId, onToggle }) => {
  const { postStore } = useStore();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = async () => {
    // Optimistic update — немедленно, без ожидания API
    const nextLiked = !postStore.isLiked;
    postStore.applyLike(nextLiked, postStore.likesCount + (nextLiked ? 1 : -1));

    scale.value = withSequence(
      withTiming(1.2, TIMING),
      withTiming(1, TIMING),
    );

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}

    // Fire and forget — WebSocket придёт с реальным значением
    void onToggle(postId);
  };

  return (
    <Animated.View style={animatedStyle}>
      <PostActionChip
        icon={(color) =>
          postStore.isLiked ? (
            <HeartFilledIcon width={18} height={15} color={color} />
          ) : (
            <HeartIcon width={18} height={18} color={color} />
          )
        }
        count={postStore.likesCount}
        isActive={postStore.isLiked}
        variant="like"
        onPress={handlePress}
      />
    </Animated.View>
  );
});
