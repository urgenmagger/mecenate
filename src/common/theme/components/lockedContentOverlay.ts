import { textStyles } from '../typography';
import { colors } from '../colors';

export const lockedContentOverlayTokens = {
  text: {
    ...textStyles.lockedOverlayText,
    color: colors.neutral.white,
    textAlign: 'center' as const,
  },
  donateButton: {
    width: 239,
    height: 42,
    borderRadius: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.brand.primary,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  donateButtonLabel: {
    ...textStyles.lockedOverlayText,
    color: colors.neutral.white,
  },
  skeleton: {
    height: 40,
    borderRadius: 22,
    backgroundColor: 'rgba(238, 239, 241, 0.8)',
  },
} as const;
