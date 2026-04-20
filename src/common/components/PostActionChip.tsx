import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { postActionChipTokens } from '../theme';

const t = postActionChipTokens;

interface PostActionChipProps {
  icon: (color: string) => React.ReactNode;
  count: number;
  isActive?: boolean;
  variant?: 'like' | 'default';
  onPress?: () => void;
  style?: ViewStyle;
}

export const PostActionChip: FC<PostActionChipProps> = ({
  icon,
  count,
  isActive = false,
  variant = 'default',
  onPress,
  style,
}) => {
  const isActiveLike = isActive && variant === 'like';
  const chipStyle = isActiveLike ? styles.chipActiveLike : styles.chip;
  const textStyle = isActiveLike ? styles.counterActiveLike : styles.counter;
  const iconColor = isActiveLike ? t.activeLike.iconColor : t.iconColor;

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[chipStyle, style]}
      {...(onPress ? { onPress, activeOpacity: 0.75 } : {})}
    >
      {icon(iconColor)}
      <Text style={textStyle}>{count}</Text>
    </Container>
  );
};

const baseChip = {
  height: t.height,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  borderRadius: t.borderRadius,
  overflow: 'hidden' as const,
  paddingTop: t.padding.top,
  paddingRight: t.padding.right,
  paddingBottom: t.padding.bottom,
  paddingLeft: t.padding.left,
  gap: t.gap,
};

const styles = StyleSheet.create({
  chip: {
    ...baseChip,
    backgroundColor: t.backgroundColor,
  },
  chipActiveLike: {
    ...baseChip,
    backgroundColor: t.activeLike.backgroundColor,
  },
  counter: t.counterText,
  counterActiveLike: t.activeLike.counterText,
});
