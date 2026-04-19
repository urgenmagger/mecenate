import React, { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedTabs } from '../../common/components/SegmentedTabs';
import { SkeletonBlock } from '../../common/components/SkeletonBlock';
import { colors } from '../../common/constants/colors';
import { Post } from '../../api/types/api';
import { useGetPosts } from '../../api/hooks/posts/useGetPosts';
import { FeedPostCard } from './components/FeedPostCard';
import { PaidPostCard } from './components/PaidPostCard';

const TABS = [
  { key: 'all', label: 'Все' },
  { key: 'free', label: 'Бесплатные' },
  { key: 'paid', label: 'Платные' },
];

const PostSkeleton = () => (
  <View style={styles.skeleton}>
    <View style={styles.skeletonHeader}>
      <SkeletonBlock width={36} height={36} borderRadius={18} />
      <View style={{ gap: 6, flex: 1 }}>
        <SkeletonBlock width="50%" height={12} />
        <SkeletonBlock width="30%" height={10} />
      </View>
    </View>
    <SkeletonBlock height={180} borderRadius={8} />
    <SkeletonBlock width="70%" height={14} />
    <SkeletonBlock width="90%" height={12} />
  </View>
);

export const FeedScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tier = activeTab === 'all' ? undefined : (activeTab as 'free' | 'paid');

  const { data: posts, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetPosts({ tier });

  const renderPost = ({ item }: { item: Post }) => {
    if (item.tier === 'paid') {
      return <PaidPostCard post={item} onDonate={(id) => console.log('donate', id)} />;
    }
    return <FeedPostCard post={item} />;
  };

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return <ActivityIndicator color={colors.primary} style={styles.footer} />;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <SegmentedTabs tabs={TABS} activeKey={activeTab} onPress={setActiveTab} />
          <PostSkeleton />
          <PostSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <SegmentedTabs tabs={TABS} activeKey={activeTab} onPress={setActiveTab} />
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          onEndReached={() => hasNextPage && fetchNextPage()}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  list: {
    gap: 12,
    paddingBottom: 24,
  },
  skeleton: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    gap: 10,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footer: {
    paddingVertical: 16,
  },
});
