import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../../../common/constants/colors';
import { Post } from '../../../api/types/api';
import { PostAuthor } from './PostAuthor';
import DonateIcon from '../../../assets/icons/donate.svg';

interface PaidPostCardProps {
  post: Post;
  onDonate: (postId: string) => void;
}

export const PaidPostCard: React.FC<PaidPostCardProps> = ({ post, onDonate }) => {
  return (
    <View style={styles.container}>
      <PostAuthor author={post.author} />
      {!!post.title && <Text style={styles.title}>{post.title}</Text>}
      <View style={styles.imageWrapper}>
        {!!post.coverUrl && (
          <Image source={{ uri: post.coverUrl }} style={styles.cover} blurRadius={8} />
        )}
        <BlurView intensity={40} tint="dark" style={styles.blur}>
          <Text style={styles.hint}>{post.preview || 'Контент доступен после доната'}</Text>
          <TouchableOpacity style={styles.button} onPress={() => onDonate(post.id)}>
            <DonateIcon width={16} height={16} fill={colors.textPrimary} />
            <Text style={styles.buttonText}>Отправить донат</Text>
          </TouchableOpacity>
        </BlurView>
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
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    minHeight: 160,
  },
  cover: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  blur: {
    flex: 1,
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  hint: {
    color: colors.textPrimary,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
});
