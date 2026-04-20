import { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
}

const FeedPostCardComponent: FC<FeedPostCardProps> = ({ post }) => {
  const { toggleLike } = useToggleLike();

  return (
    <View style={styles.container}>
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
      <View style={[styles.actions, styles.inner]}>
        <PostActionChip
          icon={(color) =>
            post.isLiked ? (
              <HeartFilledIcon width={18} height={15} />
            ) : (
              <HeartIcon width={18} height={18} />
            )
          }
          count={post.likesCount}
          isActive={post.isLiked}
          variant="like"
          onPress={() => toggleLike(post.id)}
        />
        <PostActionChip
          icon={(color) => <CommentIcon width={15} height={15} />}
          count={post.commentsCount}
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
