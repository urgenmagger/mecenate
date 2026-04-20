import { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
}

export const Avatar: FC<AvatarProps> = ({ uri, size = 36 }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
