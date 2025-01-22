import LocalStorage from "@awesome-cordova-library/localstorage";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { GameDatabase } from "../../../types";
import { useRouterInterface } from "../useRouter";
import scenes from "../../../GameDevSoftware/scenes/index.json";

export interface useSaveInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSave> {}

const useSave = (pushNextScene: useRouterInterface["pushNextScene"]) => {
  const [game, setGame] = useState<GameDatabase>({
    currentScene: 0,
    history: [],
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  const canPrev = useMemo(
    () => game.history.length > 1 && !game.history.includes(0),
    [game]
  );
  const canContinue = useMemo(() => game.currentScene !== 0, [game]);

  const saveData = useCallback(
    <T = any>(table: Exclude<string, "currentScene" | "history">, value: T) => {
      setGame((_game) => {
        _game[table] = value;

        return JSON.parse(JSON.stringify(_game));
      });
    },
    []
  );

  const getData = useCallback(
    <T = any>(
      table: Exclude<string, "currentScene" | "history">
    ): T | undefined => {
      return game[table];
    },
    [game]
  );

  const nextScene = useCallback(
    (sceneId: number | string) => {
      setGame((_game) => {
        if (typeof sceneId === "string") {
          sceneId = Number(sceneId.replace("@s:", ""));
        }
        pushNextScene(sceneId);

        _game.history.push(sceneId);
        _game.currentScene = sceneId;
        return JSON.parse(JSON.stringify(_game));
      });
    },
    [pushNextScene]
  );

  const prevScene = useCallback(() => {
    setGame((_game) => {
      const { history } = _game;

      if (history.length <= 1) {
        return _game;
      }
      const scene = history[history.length - 2];
      history.pop();
      pushNextScene(scene);
      return JSON.parse(
        JSON.stringify({
          ..._game,
          currentScene: scene,
        })
      );
    });
  }, [pushNextScene]);

  const startGame = useCallback(() => {
    pushNextScene(game.currentScene);
  }, [game, pushNextScene]);

  const startNewGame = useCallback(() => {
    const firstScene =
      scenes.find((scene) => scene.firstScene) ||
      scenes.find((scene) => scene.file === "1.json") ||
      scenes[0];
    const sceneId = Number(firstScene.file.replace(".json", ""));
    setGame({
      currentScene: sceneId,
      history: [sceneId],
    });
    pushNextScene(sceneId);
  }, [pushNextScene]);

  useEffect(() => {
    const data = LocalStorage.getItem<GameDatabase>("game");
    if (data) {
      setGame(data);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    const { currentScene } = game;
    if (currentScene !== 0) {
      LocalStorage.setItem<GameDatabase>("game", game);
    }
  }, [game]);

  return {
    game,
    loaded,
    canPrev,
    canContinue,
    nextScene,
    prevScene,
    startGame,
    startNewGame,
    saveData,
    getData,
  };
};

export default useSave;
