import { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from '../../../common/components/Avatar';
import { authorRowTokens } from '../../../common/theme';
import { Author } from '../../../api/types/api';

interface PostAuthorProps {
  author: Author;
  showUsername?: boolean;
}

const t = authorRowTokens;

const PostAuthorComponent: FC<PostAuthorProps> = ({ author, showUsername = true }) => {
  return (
    <View style={styles.container}>
      <Avatar uri={author.avatarUrl} size={t.avatarSize} />
      <View>
        <Text style={styles.name}>{author.displayName}</Text>
        {showUsername && <Text style={styles.username}>@{author.username}</Text>}
      </View>
    </View>
  );
};

export const PostAuthor = memo(PostAuthorComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: t.gap,
  },
  name: t.name,
  username: t.username,
});
