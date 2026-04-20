import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';
import { textStyles } from '../typography';

export const postCardTokens = {
  container: {
    backgroundColor: colors.background.surface,
    borderRadius: radii.md,
    overflow: 'hidden' as const,
    paddingVertical: spacing[12],
    gap: spacing[8],
  },
  inner: {
    paddingHorizontal: spacing[12],
  },
  cover: {
    width: '100%' as const,
    aspectRatio: 1,
  },
  actions: {
    flexDirection: 'row' as const,
    gap: spacing[8],
    paddingTop: spacing[4],
  },
  title: {
    ...textStyles.postTitle,
    color: colors.text.onLight,
  },
  body: {
    ...textStyles.postBody,
    color: colors.text.onLight,
  },
  bodyMaxLines: 2,
  showMore: {
    ...textStyles.postBodyLink,
    color: colors.brand.primary,
  },
} as const;
