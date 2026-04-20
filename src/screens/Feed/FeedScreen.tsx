import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SegmentedTabs } from "../../common/components/SegmentedTabs";
import { SkeletonBlock } from "../../common/components/SkeletonBlock";
import { colors, spacing, radii } from "../../common/theme";
import { Post } from "../../api/types/api";
import { useGetPosts } from "../../api/hooks/posts/useGetPosts";
import { FeedPostCard } from "./components/FeedPostCard";
import { PaidPostCard } from "./components/PaidPostCard";

const TABS = [
  { key: "all", label: "Все" },
  { key: "free", label: "Бесплатные" },
  { key: "paid", label: "Платные" },
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

export const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tier = activeTab === "all" ? undefined : (activeTab as "free" | "paid");

  const {
    data: posts,
    isLoading,
    isRefetching,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useGetPosts({ tier, limit: 3 });

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const handleDonate = useCallback(() => {}, []);

  const renderPost = useCallback<ListRenderItem<Post>>(
    ({ item }) => {
      if (item.tier === "paid") {
        return <PaidPostCard post={item} onDonate={handleDonate} />;
      }
      return <FeedPostCard post={item} />;
    },
    [handleDonate],
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    return (
      <ActivityIndicator color={colors.brand.primary} style={styles.footer} />
    );
  };

  if (error && !posts?.length) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.tabsWrapper}>
            <SegmentedTabs
              tabs={TABS}
              activeKey={activeTab}
              onPress={setActiveTab}
            />
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Не удалось загрузить публикации
            </Text>
            <Pressable onPress={() => refetch()} style={styles.retryButton}>
              <Text style={styles.retryLabel}>Повторить</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <View style={styles.tabsWrapper}>
            <SegmentedTabs
              tabs={TABS}
              activeKey={activeTab}
              onPress={setActiveTab}
            />
          </View>
          <PostSkeleton />
          <PostSkeleton />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.tabsWrapper}>
          <SegmentedTabs
            tabs={TABS}
            activeKey={activeTab}
            onPress={setActiveTab}
          />
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={colors.brand.primary}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
  container: {
    flex: 1,
    paddingTop: spacing[12],
    gap: spacing[12],
  },
  tabsWrapper: {
    paddingHorizontal: spacing[12],
  },
  list: {
    gap: spacing[12],
    paddingBottom: spacing[24],
  },
  skeleton: {
    backgroundColor: colors.background.surface,
    borderRadius: radii.md,
    padding: spacing[12],
    gap: spacing[8],
  },
  skeletonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[8],
  },
  footer: {
    paddingVertical: spacing[16],
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[16],
    paddingHorizontal: spacing[24],
  },
  errorText: {
    fontSize: 15,
    color: colors.text.onLight,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: colors.brand.primary,
    paddingHorizontal: spacing[24],
    paddingVertical: spacing[12],
    borderRadius: radii.md,
  },
  retryLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.neutral.white,
  },
});
