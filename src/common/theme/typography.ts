export const fontFamily = {
  regular: 'Manrope_400Regular',
  medium: 'Manrope_500Medium',
  semiBold: 'Manrope_600SemiBold',
  bold: 'Manrope_700Bold',
} as const;

export const fontSize = {
  xs: 12,
  sm: 13,
  md: 14,
  base: 16,
  lg: 15,
  xl: 18,
} as const;

export const lineHeight = {
  sm: 16,
  md: 20,   // TODO: уточнить line-height для tab label из Figma
  lg: 22,
} as const;

export const textStyles = {
  authorName: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as const,
    fontSize: fontSize.lg,     // 15
    lineHeight: lineHeight.md, // 20
    letterSpacing: 0,
  },
  postActionCounter: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as const,
    fontSize: fontSize.sm,     // 13
    lineHeight: 18,
    letterSpacing: 0,
  },
  postTitle: {
    fontFamily: fontFamily.bold,
    fontWeight: '700' as const,
    fontSize: fontSize.xl,
    lineHeight: 26,
    letterSpacing: 0,
  },
  postBody: {
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
  },
  postBodyLink: {
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
  },
  navLabel: {
    fontFamily: fontFamily.medium,
    fontWeight: '500' as const,
    fontSize: fontSize.base,
    lineHeight: lineHeight.lg,
    letterSpacing: 0,
  },
  bodyText: {
    fontFamily: fontFamily.regular,
    fontWeight: '400' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
  },
  lockedOverlayText: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '600' as const,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.md,
    letterSpacing: 0,
  },
} as const;
