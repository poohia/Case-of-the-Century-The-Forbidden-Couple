import { useCallback, useMemo, useState } from "react";

import { useGameObjects } from "../../../../hooks";
import { Item } from "../types";
import { useGameProvider } from "../../../../gameProvider";

const useItem = () => {
  const {
    getValueFromConstant,
    saveData: saveDataGameProvider,
    getData,
    playSoundEffect,
  } = useGameProvider();
  const { getGameObjectsFromType } = useGameObjects();

  const itemObjectKey = useMemo(() => "item", []);
  const unLockTableCache = useMemo(() => "item_unlock", []);
  const alreadyUnLockTableCache = useMemo(() => "item_already_unlock", []);
  const unLockNotifyTableCache = useMemo(() => "item_unlock_notify", []);

  const [unLockItems, setUnLockItems] = useState<number[]>([]);
  const [unLockItemsNotify, setUnLockItemsNotify] = useState<number[]>([]);

  const haveNotifications = useMemo(
    () => unLockItemsNotify.length > 0,
    [unLockItemsNotify]
  );

  const saveData = (tableCache: string, data: number[]) => {
    switch (tableCache) {
      case unLockTableCache:
        setUnLockItems(data);
        break;
      case unLockNotifyTableCache:
        setUnLockItemsNotify(data);
    }
    saveDataGameProvider(tableCache, data);
  };

  const getItemsByUniqueKey = useCallback((uniqueKey: string) => {
    return getGameObjectsFromType<Item>(itemObjectKey).filter((go) => {
      if (go.uniqueKey.startsWith("@c:")) {
        return getValueFromConstant(uniqueKey) === uniqueKey;
      }
      return go.uniqueKey === uniqueKey;
    });
  }, []);

  const getItemById = useCallback((id: number) => {
    const results = getGameObjectsFromType<Item>(itemObjectKey).filter(
      (go) => go._id === id
    );
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }, []);

  const getUnLockItems = useCallback(() => {
    return getData<number[]>(unLockTableCache) || [];
  }, []);

  const getAlreadyUnLockItems = useCallback(() => {
    return getData<number[]>(alreadyUnLockTableCache) || [];
  }, []);

  const removeUnLockItemById = useCallback((id: number) => {
    removeNotificationById(id);
    const itemsUnLock = getUnLockItems();
    saveData(
      unLockTableCache,
      itemsUnLock.filter((itemId) => itemId !== id)
    );
  }, []);

  const unLockItem = useCallback(
    (
      id: number,
      opts: {
        notify?: boolean;
        soundNotify?: string;
        volumeSoundNotify?: number;
      } = {}
    ) => {
      const item = getItemById(id);
      if (!item) {
        return;
      }
      const alreadyUnLockItems = getAlreadyUnLockItems();

      if (alreadyUnLockItems.find((itemId) => itemId === id)) {
        console.warn("This item already unlock on this session gaming", item);
        return;
      }
      const unLockItems = getUnLockItems();
      saveData(unLockTableCache, unLockItems.concat(id));
      saveData(alreadyUnLockTableCache, alreadyUnLockItems.concat(id));
      const { notify, soundNotify: sound, volumeSoundNotify: volume } = opts;
      if (notify && sound) {
        playSoundEffect({ sound, volume });
      }
      if (notify) {
        const unLockItemsNotify =
          getData<number[]>(unLockNotifyTableCache) || [];
        saveData(unLockNotifyTableCache, unLockItemsNotify.concat(id));
      }
    },
    [getData, saveData]
  );

  const getItemsUnlockByUniqueKey = useCallback((uniqueKey: string) => {
    return getGameObjectsFromType<Item>("item").filter((go) => {
      if (go.uniqueKey.startsWith("@c:")) {
        return getValueFromConstant(uniqueKey) === uniqueKey;
      }
      return go.uniqueKey === uniqueKey;
    });
  }, []);

  const removeNotificationById = useCallback((id: number) => {
    const unLockItemsNotify = getData<number[]>(unLockNotifyTableCache) || [];
    saveData(
      unLockNotifyTableCache,
      unLockItemsNotify.filter((itemId) => itemId !== id)
    );
  }, []);

  const removeAllNotifications = useCallback(() => {
    saveData(unLockNotifyTableCache, []);
  }, []);

  return {
    haveNotifications,
    getItemsByUniqueKey,
    getItemById,
    getItemsUnlockByUniqueKey,
    unLockItem,
    removeNotificationById,
    removeAllNotifications,
    removeUnLockItemById,
  };
};

export default useItem;
