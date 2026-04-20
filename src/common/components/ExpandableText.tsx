import { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { postCardTokens } from '../theme';
import { colors } from '../theme/colors';
import { strings } from '../constants/strings';

const t = postCardTokens;

interface ExpandableTextProps {
  text: string;
}

export const ExpandableText: FC<ExpandableTextProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  return (
    <View>
      {/* Invisible full text to measure actual line count */}
      <Text
        style={styles.hidden}
        onTextLayout={(e) => setIsTruncated(e.nativeEvent.lines.length > t.bodyMaxLines)}
        aria-hidden
      >
        {text}
      </Text>

      <Text
        style={styles.body}
        numberOfLines={expanded ? undefined : t.bodyMaxLines}
        onPress={expanded ? () => setExpanded(false) : undefined}
      >
        {text}
      </Text>

      {!expanded && isTruncated && (
        <View style={styles.overlay} pointerEvents="box-none">
          <LinearGradient
            colors={['rgba(255,255,255,0)', colors.background.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
            pointerEvents="none"
          />
          <Text style={styles.showMoreLabel} onPress={() => setExpanded(true)}>
            {strings.actions.showMore}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: t.body,
  hidden: {
    ...t.body,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0,
    pointerEvents: 'none',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  gradient: {
    width: 48,
  },
  showMoreLabel: {
    ...t.showMore,
    backgroundColor: colors.background.surface,
  },
});
