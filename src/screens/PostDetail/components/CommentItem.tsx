import { FC, memo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Avatar } from '../../../common/components/Avatar';
import { Comment } from '../../../api/types/api';
import { colors, spacing, fontFamily, fontSize } from '../../../common/theme';
import HeartIcon from '../../../assets/icons/heart.svg';
import HeartFilledIcon from '../../../assets/icons/heart-filled.svg';

interface CommentItemProps {
  comment: Comment;
}

const TIMING = { duration: 150 };

const CommentItemComponent: FC<CommentItemProps> = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = async () => {
    const prevLiked = isLiked;
    const prevCount = likesCount;

    // Optimistic update
    const nextLiked = !prevLiked;
    setIsLiked(nextLiked);
    setLikesCount(prevCount + (nextLiked ? 1 : -1));

    // Animation
    scale.value = withSequence(
      withTiming(1.2, TIMING),
      withTiming(1, TIMING),
    );

    // Haptic (safe on Android)
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}

    // Placeholder for API call — rollback on error
    try {
      // await commentLikeApi(comment.id, nextLiked);
    } catch {
      setIsLiked(prevLiked);
      setLikesCount(prevCount);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar uri={comment.author.avatarUrl} size={40} />
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {comment.author.displayName}
        </Text>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
      <Pressable onPress={handleLike} hitSlop={8}>
        <Animated.View style={[styles.likeBlock, animatedStyle]}>
          {isLiked ? (
            <HeartFilledIcon width={15} height={15} color={colors.brand.like} />
          ) : (
            <HeartIcon width={15} height={15} color={colors.text.secondary} />
          )}
          <Text style={[styles.likeCount, isLiked && styles.likeCountActive]}>
            {likesCount}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export const CommentItem = memo(CommentItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing[12],
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[8],
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    fontSize: fontSize.lg,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.text.onLight,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    fontSize: fontSize.md,
    lineHeight: 20,
    letterSpacing: 0,
    color: colors.text.onLight,
  },
  likeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontFamily: fontFamily.bold,
    fontWeight: '700',
    fontSize: fontSize.sm,
    lineHeight: 18,
    letterSpacing: 0,
    color: colors.text.secondary,
  },
  likeCountActive: {
    color: colors.brand.like,
  },
});
