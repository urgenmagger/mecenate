import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';
import { fontFamily } from '../typography';

export const topTabsTokens = {
  container: {
    height: 38,
    backgroundColor: colors.neutral.white,
    borderWidth: 1,
    borderColor: colors.neutral.border,
    borderRadius: radii.full,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[2],
  },
  tab: {
    paddingHorizontal: spacing[2],
    active: {
      backgroundColor: colors.brand.primary,
      borderRadius: radii.full,
      labelColor: colors.brand.primaryText,
    },
    inactive: {
      labelColor: colors.text.inactive,
    },
    label: {
      fontFamily: fontFamily.medium,
      fontSize: 13,
      lineHeight: 18,
    },
  },
} as const;
