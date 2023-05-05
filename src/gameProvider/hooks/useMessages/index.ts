import { useCallback, useEffect } from "react";
import { GameProviderHooksDefaultInterface } from "..";
import { EnvType, GameDatabase, ParamsRoute, Route } from "../../../types";
import LocalStorage from "@awesome-cordova-library/localstorage";

export interface useMessageInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useMessage> {}

type useMessageProps = {
  env: EnvType;
  route: Route;
  params: ParamsRoute | undefined;
};

type Messages = "getSaveData" | "setSaveData" | "changePath";

const useMessage = (props: useMessageProps) => {
  const { env, route, params } = props;
  const sendMessage = useCallback(
    (source: MessageEventSource | null, title: Messages, data: any) => {
      if (!source) {
        window.parent?.postMessage({ message: { title }, data }, "*");
        return;
      }
      // @ts-ignore
      source.postMessage({ message: { title }, data }, "*");
    },
    []
  );

  const getSaveData = useCallback(() => {
    return {
      game: LocalStorage.getItem<GameDatabase>("game"),
      lastPath: LocalStorage.getItem<string>("last-path"),
    };
  }, []);

  const setSaveData = useCallback(
    (data: { game: GameDatabase; lastPath: string }) => {
      LocalStorage.setItem("game", data.game);
      LocalStorage.setItem("last-path", data.lastPath);
    },
    []
  );

  const sendPathInfo = useCallback(() => {
    if (route === "scene" && !params) {
      const data = getSaveData();
      sendMessage(null, "changePath", {
        route,
        params: {
          sceneId: data.game?.currentScene,
        },
      });
      return;
    }
    sendMessage(null, "changePath", { route, params });
  }, [route, params, sendMessage, getSaveData]);

  const receiveMessage = useCallback(
    ({
      data,
      source,
    }: MessageEvent<{ title: "getSaveData" | "setSaveData"; data: any }>) => {
      switch (data.title) {
        case "getSaveData":
          // @ts-ignore
          sendMessage(source, data.title, getSaveData());
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

  useEffect(() => {
    if (env === "development") {
      sendPathInfo();
    }
  }, [env, route, params, sendPathInfo]);

  return {
    loaded: true,
  };
};

export default useMessage;
