import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../../common/components/Avatar';
import { colors } from '../../../common/constants/colors';
import { Author } from '../../../api/types/api';

interface PostAuthorProps {
  author: Author;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ author }) => {
  return (
    <View style={styles.container}>
      <Avatar uri={author.avatarUrl} size={36} />
      <View>
        <Text style={styles.name}>{author.displayName}</Text>
        <Text style={styles.username}>@{author.username}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  username: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
