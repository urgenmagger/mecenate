import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';
import { textStyles } from '../typography';

export const postActionChipTokens = {
  height: 36,
  borderRadius: radii.full,
  backgroundColor: colors.background.surfaceSoft,
  padding: {
    top: 9,
    right: spacing[12],
    bottom: 9,
    left: spacing[8],
  },
  gap: spacing[4],
  counterText: {
    ...textStyles.postActionCounter,
    lineHeight: 16,
    color: colors.text.secondary,   // #57626F
  },
  iconColor: colors.text.secondary, // TODO: уточнить из Figma (inactive icon tint)

  activeLike: {
    backgroundColor: colors.brand.like,   // #FF2B75
    iconColor: colors.neutral.white,      // #FFFFFF
    counterText: {
      ...textStyles.postActionCounter,
      lineHeight: 16,
      color: colors.neutral.white,        // #FFFFFF
    },
  },
} as const;
