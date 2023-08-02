import { useCallback, useMemo } from "react";
import { useGameProvider } from "../../gameProvider";

const useStores = () => {
  const { platform, appConfig } = useGameProvider();

  const storeLink = useMemo(() => {
    console.log(platform);
    if (
      (platform === "browserios" || platform === "ios") &&
      appConfig.appStore?.startsWith("https://apps.apple.com/")
    ) {
      return appConfig.appStore;
    }
    if (
      (platform === "browserandroid" || platform === "android") &&
      appConfig.playStore?.startsWith(
        "https://play.google.com/store/apps/details"
      )
    ) {
      return appConfig.playStore;
    }
    if (!!appConfig.webStore) {
      return appConfig.webStore;
    }
    return "#";
  }, [appConfig, platform]);

  const reviewLink = useMemo(() => {
    if (
      (platform === "browserios" || platform === "ios") &&
      appConfig.appStore?.startsWith("https://apps.apple.com/")
    ) {
      return `${appConfig.appStore}?action=write-review`;
    }
    if (
      (platform === "browserandroid" || platform === "android") &&
      appConfig.playStore?.startsWith(
        "https://play.google.com/store/apps/details"
      )
    ) {
      return `market://details?id=${appConfig.build.id}&showAllReviews=true`;
    }
    if (!!appConfig.webStore) {
      return appConfig.webStore;
    }
    return "#";
  }, [appConfig, platform]);

  const openStoreUrl = useCallback(() => {
    window.open(storeLink, "_system");
  }, [storeLink]);
  const openReviewUrl = useCallback(() => {
    window.open(reviewLink, "_system");
  }, [reviewLink]);

  return {
    storeLink,
    reviewLink,
    openStoreUrl,
    openReviewUrl,
  };
};

export default useStores;
