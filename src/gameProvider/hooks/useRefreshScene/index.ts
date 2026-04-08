import { useCallback, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";

export interface useRefreshSceneInterface
  extends
    GameProviderHooksDefaultInterface,
    ReturnType<typeof useRefreshScene> {}

const useRefreshScene = () => {
  const [keyScene, setKeyScene] = useState<number>(0);

  const refreshScene = useCallback(() => {
    setKeyScene((prev) => prev + 1);
  }, []);

  return {
    loaded: true,
    keyScene,
    refreshScene,
  };
};

export default useRefreshScene;
