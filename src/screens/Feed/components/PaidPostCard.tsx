import { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { colors, lockedContentOverlayTokens, postCardTokens, spacing, radii } from '../../../common/theme';
import { Post } from '../../../api/types/api';
import { PostAuthor } from './PostAuthor';
import { DonateButton } from '../../../common/buttons/DonateButton';
import { strings } from '../../../common/constants/strings';
import { SkeletonBlock } from '../../../common/components/SkeletonBlock';
import DonateIcon from '../../../assets/icons/donate.svg';

interface PaidPostCardProps {
  post: Post;
  onDonate: (postId: string) => void;
}

const PaidPostCardComponent: FC<PaidPostCardProps> = ({ post, onDonate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <PostAuthor author={post.author} showUsername={false} />
      </View>
      <View style={styles.imageWrapper}>
        {!!post.coverUrl && (
          <Image source={post.coverUrl} style={styles.cover} contentFit="cover" blurRadius={8} />
        )}
        <BlurView intensity={40} tint="dark" style={styles.blur}>
          <View style={styles.iconBadge}>
            <DonateIcon width={20} height={20} fill={colors.neutral.white} />
          </View>
          <Text style={styles.hint}>{strings.lockedContent.hint}</Text>
          <DonateButton onPress={() => onDonate(post.id)} />
        </BlurView>
      </View>
      <View style={[styles.inner, styles.skeletons]}>
        <SkeletonBlock style={[styles.skeleton, styles.skeletonShort]} />
        <SkeletonBlock style={styles.skeleton} />
      </View>
    </View>
  );
};

export const PaidPostCard = memo(PaidPostCardComponent);

const styles = StyleSheet.create({
  container: postCardTokens.container,
  inner: postCardTokens.inner,
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
    width: '100%',
    aspectRatio: 1,
  },
  cover: {
    ...postCardTokens.cover,
    position: 'absolute',
  },
  blur: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[12],
    paddingVertical: spacing[24],
    paddingHorizontal: spacing[16],
  },
  hint: lockedContentOverlayTokens.text,
  skeletons: {
    gap: spacing[8],
  },
  skeleton: lockedContentOverlayTokens.skeleton,
  skeletonShort: {
    width: 164,
    height: 26,
  },
});
