import { textStyles, fontSize } from '../typography';
import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';

export const authorRowTokens = {
  avatarSize: 40,
  avatarRadius: radii.lg,
  gap: spacing[8],
  name: {
    ...textStyles.authorName,
    color: colors.text.onLight,
  },
  username: {
    color: colors.text.secondary,   // #57626F
    fontSize: fontSize.xs,          // 12
  },
} as const;
