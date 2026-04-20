import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { lockedContentOverlayTokens } from '../theme';

interface DonateButtonProps {
  label?: string;
  onPress: () => void;
}

export const DonateButton: FC<DonateButtonProps> = ({
  label = 'Отправить донат',
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: lockedContentOverlayTokens.donateButton,
  label: lockedContentOverlayTokens.donateButtonLabel,
});
