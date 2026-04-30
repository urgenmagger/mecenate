import { useCallback, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { useGetPost } from '../../api/hooks/posts/useGetPost';
import { useGetComments } from '../../api/hooks/comments/useGetComments';
import { useToggleLike } from '../../api/hooks/posts/useToggleLike';
import { useCreateComment } from '../../api/hooks/comments/useCreateComment';
import { Comment } from '../../api/types/api';
import { useStore } from '../../stores/StoreContext';
import { usePostWebSocket } from '../../api/hooks/ws/usePostWebSocket';
import { colors, spacing, fontFamily, fontSize, lineHeight, textStyles } from '../../common/theme';
import { PostAuthor } from '../Feed/components/PostAuthor';
import { CommentItem } from './components/CommentItem';
import { LikeButton } from './components/LikeButton';
import { CommentInput } from './components/CommentInput';
import { PostActionChip } from '../../common/components/PostActionChip';
import CommentIcon from '../../assets/icons/comment.svg';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'PostDetail'>;

const pluralComments = (n: number): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} комментариев`;
  if (mod10 === 1) return `${n} комментарий`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} комментария`;
  return `${n} комментариев`;
};

export const PostDetailScreen = observer(({ route, navigation }: Props) => {
  const { postId } = route.params;
  const { postStore } = useStore();
  const insets = useSafeAreaInsets();

  const { data: post, isLoading: postLoading } = useGetPost(postId);
  const { data: comments, isLoading: commentsLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetComments(postId);
  const { toggleLike } = useToggleLike();
  const { createComment, isLoading: commentSending } = useCreateComment();

  useEffect(() => {
    if (post) {
      postStore.init(post.likesCount, post.isLiked);
    }
  }, [post, postStore]);

  useEffect(() => {
    return () => { postStore.resetComments(); };
  }, [postId, postStore]);

  usePostWebSocket(postId, postStore);

  const handleSubmitComment = useCallback(async (text: string) => {
    const comment = await createComment(postId, text);
    if (comment) {
      postStore.applyNewComment(comment);
    }
  }, [createComment, postId, postStore]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const renderComment = useCallback<ListRenderItem<Comment>>(
    ({ item }) => <CommentItem comment={item} />,
    [],
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator color={colors.brand.primary} style={styles.footerLoader} />;
  };

  if (postLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator color={colors.brand.primary} style={styles.centerLoader} />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>Публикация не найдена</Text>
      </SafeAreaView>
    );
  }

  const ListHeader = (
    <View>
      <View style={[styles.header, { paddingTop: insets.top + spacing[12] }]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backLabel}>‹ Назад</Text>
        </Pressable>
        <PostAuthor author={post.author} />
      </View>
      {!!post.coverUrl && (
        <Image source={post.coverUrl} style={styles.cover} contentFit="cover" />
      )}
      <View style={styles.content}>
        <View style={styles.textBlock}>
          {!!post.title && <Text style={styles.title}>{post.title}</Text>}
          {!!(post.body || post.preview) && (
            <Text style={styles.body}>{post.body || post.preview}</Text>
          )}
        </View>
        <View style={styles.actions}>
          <LikeButton postId={postId} onToggle={toggleLike} />
          <PostActionChip
            icon={() => <CommentIcon width={15} height={15} />}
            count={post.commentsCount}
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.commentsRow}>
        <Text style={styles.commentsCount}>{pluralComments(post.commentsCount)}</Text>
        <Pressable>
          <Text style={styles.sortLabel}>Сначала новые</Text>
        </Pressable>
      </View>
      {commentsLoading && (
        <ActivityIndicator color={colors.brand.primary} style={styles.footerLoader} />
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={[...postStore.comments, ...(comments ?? [])].filter(
          (c, i, arr) => arr.findIndex((x) => x.id === c.id) === i,
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderComment}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      <CommentInput onSubmit={handleSubmitComment} isLoading={commentSending} />
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
  header: {
    paddingHorizontal: spacing[16],
    paddingBottom: spacing[12],
    gap: spacing[12],
    backgroundColor: colors.background.surface,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backLabel: {
    ...textStyles.navLabel,
    color: colors.brand.primary,
  },
  cover: {
    width: '100%',
    height: 260,
  },
  content: {
    padding: spacing[16],
    gap: spacing[16],
    backgroundColor: colors.background.surface,
  },
  textBlock: {
    gap: spacing[8],
  },
  title: {
    ...textStyles.postTitle,
    color: colors.text.onLight,
  },
  body: {
    ...textStyles.postBody,
    color: colors.text.onLight,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral.border,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing[8],
  },
  commentsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[16],
    paddingVertical: spacing[12],
  },
  commentsCount: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '600' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
    color: colors.text.onLight,
  },
  sortLabel: {
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
    color: colors.brand.primary,
  },
  list: {
    paddingBottom: spacing[16],
  },
  footerLoader: {
    paddingVertical: spacing[16],
  },
  centerLoader: {
    flex: 1,
  },
  errorText: {
    ...textStyles.bodyText,
    color: colors.text.onLight,
    textAlign: 'center',
    marginTop: spacing[24],
  },
});
