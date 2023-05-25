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
    sceneVisited: [],
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  const canPrev = useMemo(
    () => game.history.length > 1 && !game.history.includes(0),
    [game]
  );
  const canContinue = useMemo(() => game.currentScene !== 0, [game]);

  const saveData = useCallback(
    <T = any>(
      table: Exclude<string, "currentScene" | "sceneVisited" | "history">,
      value: T
    ) => {
      setGame((_game) => {
        _game[table] = value;

        return JSON.parse(JSON.stringify(_game));
      });
    },
    []
  );

  const getData = useCallback(
    <T = any>(
      table: Exclude<string, "currentScene" | "sceneVisited" | "history">
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

        if (!_game.sceneVisited.includes(sceneId)) {
          _game.sceneVisited.push(sceneId);
        }
        if (_game.history.length === 1) {
          _game.history = [_game.history[0], sceneId];
        } else {
          _game.history = [_game.currentScene, sceneId];
        }
        _game.currentScene = sceneId;
        return JSON.parse(JSON.stringify(_game));
      });
    },
    [pushNextScene]
  );

  const prevScene = useCallback(() => {
    const { history } = game;
    if (history.length === 1) return;
    const scene = history[0];
    setGame(
      JSON.parse(
        JSON.stringify({ ...game, currentScene: scene, history: [scene] })
      )
    );
    pushNextScene(scene);
  }, [game, pushNextScene]);

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
      sceneVisited: [sceneId],
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
