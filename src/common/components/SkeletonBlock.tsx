import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface SkeletonBlockProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}) => {
  return (
    <View
      style={[styles.block, { width: width as any, height, borderRadius }, style]}
    />
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.surface,
  },
});
