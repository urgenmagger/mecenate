import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../common/constants/colors';
import { Post } from '../../../api/types/api';
import { useToggleLike } from '../../../api/hooks/posts/useToggleLike';
import { PostAuthor } from './PostAuthor';
import HeartIcon from '../../../assets/icons/heart.svg';
import CommentIcon from '../../../assets/icons/comment.svg';

interface FeedPostCardProps {
  post: Post;
}

export const FeedPostCard: React.FC<FeedPostCardProps> = ({ post }) => {
  const { toggleLike } = useToggleLike();

  return (
    <View style={styles.container}>
      <PostAuthor author={post.author} />
      {!!post.coverUrl && (
        <Image source={{ uri: post.coverUrl }} style={styles.cover} />
      )}
      {!!post.title && <Text style={styles.title}>{post.title}</Text>}
      {!!(post.body || post.preview) && (
        <Text style={styles.body} numberOfLines={3}>
          {post.body || post.preview}
        </Text>
      )}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={() => toggleLike(post.id)}>
          <HeartIcon
            width={18}
            height={18}
            fill={post.isLiked ? colors.primary : 'none'}
            stroke={post.isLiked ? colors.primary : colors.textSecondary}
          />
          <Text style={styles.actionCount}>{post.likesCount}</Text>
        </TouchableOpacity>
        <View style={styles.action}>
          <CommentIcon width={18} height={18} stroke={colors.textSecondary} />
          <Text style={styles.actionCount}>{post.commentsCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  cover: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  body: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 4,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  actionCount: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});
