import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

interface Tab {
  key: string;
  label: string;
}

interface SegmentedTabsProps {
  tabs: Tab[];
  activeKey: string;
  onPress: (key: string) => void;
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({ tabs, activeKey, onPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeKey === tab.key && styles.tabActive]}
          onPress={() => onPress(tab.key)}
        >
          <Text style={[styles.label, activeKey === tab.key && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.textPrimary,
  },
});
