import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { topTabsTokens } from '../theme/components/topTabs';

interface Tab {
  key: string;
  label: string;
}

interface SegmentedTabsProps {
  tabs: Tab[];
  activeKey: string;
  onPress: (key: string) => void;
}

const t = topTabsTokens;

export const SegmentedTabs: FC<SegmentedTabsProps> = ({ tabs, activeKey, onPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeKey === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onPress(tab.key)}
            activeOpacity={0.8}
          >
            <Text
              style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: t.container.height,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: t.container.backgroundColor,
    borderWidth: t.container.borderWidth,
    borderColor: t.container.borderColor,
    borderRadius: t.container.borderRadius,
    paddingHorizontal: t.container.paddingHorizontal,
    paddingVertical: t.container.paddingVertical,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: t.tab.active.borderRadius,
    paddingHorizontal: t.tab.paddingHorizontal,
  },
  tabActive: {
    backgroundColor: t.tab.active.backgroundColor,
  },
  label: {
    fontFamily: t.tab.label.fontFamily,
    fontSize: t.tab.label.fontSize,
    lineHeight: t.tab.label.lineHeight,
    textAlign: 'center',
  },
  labelActive: {
    color: t.tab.active.labelColor,
  },
  labelInactive: {
    color: t.tab.inactive.labelColor,
  },
});
