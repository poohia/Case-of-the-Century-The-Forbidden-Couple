import { useCallback, useEffect } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { EnvType } from "../../../types";
import LocalStorage from "@awesome-cordova-library/localstorage";

export interface useMessageInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useMessage> {}

const useMessage = (env: EnvType) => {
  const getSaveData = useCallback(() => {
    return LocalStorage.getItem("game");
  }, []);

  const setSaveData = useCallback((data: any) => {
    return LocalStorage.setItem("game", data);
  }, []);

  const receiveMessage = useCallback(
    ({
      data,
      source,
    }: MessageEvent<{ title: "getSaveData" | "setSaveData"; data: any }>) => {
      if (!source) return;
      switch (data.title) {
        case "getSaveData":
          // @ts-ignore
          source.postMessage({ message: data, data: getSaveData() }, "*");
          break;
        case "setSaveData":
          setSaveData(data.data);
          break;
      }
    },
    [getSaveData]
  );

  useEffect(() => {
    if (env === "development") {
      window.addEventListener("message", receiveMessage, false);
      return () => {
        window.removeEventListener("message", receiveMessage, false);
      };
    }
  }, [env]);

  return {
    loaded: true,
  };
};

export default useMessage;
