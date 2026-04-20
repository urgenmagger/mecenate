import { FC } from 'react';
import { Text, StyleSheet } from 'react-native';
import { postCardTokens } from '../theme';
import { strings } from '../constants/strings';

interface ShowMoreButtonProps {
  onPress: () => void;
}

export const ShowMoreButton: FC<ShowMoreButtonProps> = ({ onPress }) => (
  <Text style={styles.label} onPress={onPress}>
    {' '}{strings.actions.showMore}
  </Text>
);

const styles = StyleSheet.create({
  label: postCardTokens.showMore,
});
