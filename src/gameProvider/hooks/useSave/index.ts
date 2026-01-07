import LocalStorage from "@awesome-cordova-library/localstorage";
import { useCallback, useEffect, useMemo, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { GameDatabase, GameDatabaseSave, SceneList } from "../../../types";
import { useRouterInterface } from "../useRouter";
import scs from "../../../GameDevSoftware/scenes/index.json";
import sa from "../../../GameDevSoftware/saves.json";

const scenes: SceneList = scs as SceneList;
const savesPreset: GameDatabaseSave[] = sa as GameDatabaseSave[];

export interface useSaveInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useSave> {}

const useSave = (opts: {
  demo: boolean;
  push: useRouterInterface["push"];
  pushNextScene: useRouterInterface["pushNextScene"];
}) => {
  const [game, setGame] = useState<GameDatabase>({
    currentScene: 0,
    history: [],
  });
  const [saves, setSaves] = useState<GameDatabaseSave[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { demo, push, pushNextScene } = opts;

  const canPrev = useMemo(
    () => game.history.length > 1 && !game.history.includes(0),
    [game]
  );
  const canContinue = useMemo(
    () => !!game?.currentScene || game.currentScene !== 0,
    [game]
  );

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
    const gameEnded = LocalStorage.getItem("game-ended");
    if (gameEnded && demo) {
      push("endDemo");
    } else if (gameEnded) {
      push("credits");
    } else {
      pushNextScene(game.currentScene);
    }
  }, [game, demo, pushNextScene]);

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
    LocalStorage.setItem("game-ended", false);
  }, [pushNextScene]);

  const createSave = useCallback(
    (title?: string) => {
      if (game.currentScene === 0) {
        return;
      }
      const saves = LocalStorage.getItem<GameDatabaseSave[]>("saves") || [];
      const date = new Date();
      saves.push({
        id: date.getTime(),
        title,
        date: date.toString(),
        game,
      });
      LocalStorage.setItem<GameDatabaseSave[]>("saves", saves);
      getSaves();
    },
    [game]
  );

  const deleteSave = useCallback((id: number) => {
    setSaves((_saves) => {
      _saves = _saves.filter((save) => save.id !== id);
      LocalStorage.setItem<GameDatabaseSave[]>("saves", _saves);
      return _saves;
    });
  }, []);

  const getSaves = useCallback(() => {
    const s = LocalStorage.getItem<GameDatabaseSave[]>("saves") || [];
    setSaves(s);
    return s;
  }, []);

  const loadSave = useCallback(
    (id: number) => {
      return new Promise((resolve, reject) => {
        const saves = getSaves();
        const saveFind =
          saves.find((save) => save.id === id) ||
          savesPreset.find((save) => save.id === id);
        if (!saveFind) {
          reject(`Save ${id} not found`);
          return;
        }
        setGame(saveFind.game);
        pushNextScene(saveFind.game.currentScene);
        resolve(true);
      });
    },
    [pushNextScene]
  );

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

  useEffect(() => {
    getSaves();
  }, []);

  return {
    game,
    loaded,
    canPrev,
    canContinue,
    saves,
    savesPreset: sa,
    nextScene,
    prevScene,
    startGame,
    startNewGame,
    saveData,
    getData,
    createSave,
    deleteSave,
    getSaves,
    loadSave,
  };
};

export default useSave;
