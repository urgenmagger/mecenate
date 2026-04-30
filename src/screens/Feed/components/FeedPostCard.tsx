import { FC, memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Post } from '../../../api/types/api';
import { useToggleLike } from '../../../api/hooks/posts/useToggleLike';
import { PostActionChip } from '../../../common/components/PostActionChip';
import { ExpandableText } from '../../../common/components/ExpandableText';
import { postCardTokens } from '../../../common/theme';
import { PostAuthor } from './PostAuthor';
import HeartIcon from '../../../assets/icons/heart.svg';
import HeartFilledIcon from '../../../assets/icons/heart-filled.svg';
import CommentIcon from '../../../assets/icons/comment.svg';

interface FeedPostCardProps {
  post: Post;
  onPress?: (postId: string) => void;
}

const TIMING = { duration: 150 };

const FeedPostCardComponent: FC<FeedPostCardProps> = ({ post, onPress }) => {
  const { toggleLike } = useToggleLike();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = async () => {
    scale.value = withSequence(
      withTiming(1.2, TIMING),
      withTiming(1, TIMING),
    );
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    void toggleLike(post.id);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress?.(post.id)}>
        <View style={styles.inner}>
          <PostAuthor author={post.author} showUsername={false} />
        </View>
        {!!post.coverUrl && (
          <Image source={post.coverUrl} style={styles.cover} contentFit="cover" />
        )}
        {!!post.title && <Text style={[styles.title, styles.inner]}>{post.title}</Text>}
        {!!(post.body || post.preview) && (
          <View style={styles.inner}>
            <ExpandableText text={post.body || post.preview} />
          </View>
        )}
      </Pressable>
      <View style={[styles.actions, styles.inner]}>
        <Animated.View style={animatedStyle}>
          <PostActionChip
            icon={(color) =>
              post.isLiked ? (
                <HeartFilledIcon width={18} height={15} color={color} />
              ) : (
                <HeartIcon width={18} height={18} color={color} />
              )
            }
            count={post.likesCount}
            isActive={post.isLiked}
            variant="like"
            onPress={handleLike}
          />
        </Animated.View>
        <PostActionChip
          icon={() => <CommentIcon width={15} height={15} />}
          count={post.commentsCount}
          onPress={() => onPress?.(post.id)}
        />
      </View>
    </View>
  );
};

export const FeedPostCard = memo(FeedPostCardComponent);

const styles = StyleSheet.create({
  container: postCardTokens.container,
  inner: postCardTokens.inner,
  cover: postCardTokens.cover,
  title: postCardTokens.title,
  actions: postCardTokens.actions,
});
