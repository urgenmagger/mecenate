import { FC } from 'react';
import { DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme';

interface SkeletonBlockProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonBlock: FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}) => {
  return (
    <View
      style={[styles.block, { width: width as DimensionValue, height, borderRadius }, style]}
    />
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.background.surface,
  },
});
