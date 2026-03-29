import LocalStorage from "@awesome-cordova-library/localstorage";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction,
} from "react";

import { GameProviderHooksDefaultInterface } from "..";
import { GameDatabase, GameDatabaseSave, SceneList } from "../../../types";
import { useRouterInterface } from "../useRouter";
import scs from "../../../GameDevSoftware/scenes/index.json";
import sa from "../../../GameDevSoftware/saves.json";

const scenes: SceneList = scs as SceneList;
const savesPreset: GameDatabaseSave[] = sa as GameDatabaseSave[];
const initialGame: GameDatabase = {
  currentScene: 0,
  history: [],
};
const cloneGame = (game: GameDatabase): GameDatabase =>
  JSON.parse(JSON.stringify(game));

export interface useSaveInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useSave> {}

const useSave = (opts: {
  demo: boolean;
  push: useRouterInterface["push"];
  pushNextScene: useRouterInterface["pushNextScene"];
}) => {
  const [game, setGameState] = useState<GameDatabase>(initialGame);
  const gameRef = useRef<GameDatabase>(initialGame);
  const [saves, setSaves] = useState<GameDatabaseSave[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { demo, push, pushNextScene } = opts;

  const setGame = useCallback((value: SetStateAction<GameDatabase>) => {
    setGameState(() => {
      const nextGame =
        typeof value === "function"
          ? (value as (game: GameDatabase) => GameDatabase)(gameRef.current)
          : value;

      gameRef.current = nextGame;
      return nextGame;
    });
  }, []);

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
      setGame((currentGame) => ({
        ...currentGame,
        [table]: value,
      }));
    },
    [setGame]
  );

  const getData = useCallback(
    <T = any>(
      table: Exclude<string, "currentScene" | "history">
    ): T | undefined => {
      return gameRef.current[table];
    },
    []
  );

  const nextScene = useCallback(
    (sceneId: number | string) => {
      setGame((currentGame) => {
        const nextSceneId =
          typeof sceneId === "string"
            ? Number(sceneId.replace("@s:", ""))
            : sceneId;

        pushNextScene(nextSceneId);

        return {
          ...currentGame,
          currentScene: nextSceneId,
          history: [...currentGame.history, nextSceneId],
        };
      });
    },
    [pushNextScene, setGame]
  );

  const prevScene = useCallback(() => {
    setGame((currentGame) => {
      if (currentGame.history.length <= 1) {
        return currentGame;
      }

      const history = currentGame.history.slice(0, -1);
      const scene = history[history.length - 1];
      pushNextScene(scene);

      return {
        ...currentGame,
        currentScene: scene,
        history,
      };
    });
  }, [pushNextScene, setGame]);

  const startGame = useCallback(
    (forceSceneId?: number) => {
      const gameEnded = LocalStorage.getItem("game-ended");
      if (gameEnded && demo) {
        push("endDemo");
      } else if (gameEnded) {
        push("credits");
      } else {
        pushNextScene(forceSceneId || gameRef.current.currentScene);
      }
    },
    [demo, push, pushNextScene]
  );

  const startNewGame = useCallback(
    (forceSceneId?: number) => {
      const firstScene =
        scenes.find((scene) => forceSceneId || scene.firstScene) ||
        scenes.find((scene) => scene.file === "1.json") ||
        scenes[0];
      const sceneId = Number(firstScene.file.replace(".json", ""));
      setGame({
        currentScene: sceneId,
        history: [sceneId],
      });
      pushNextScene(sceneId);
      LocalStorage.setItem("game-ended", false);
    },
    [pushNextScene, setGame]
  );

  const getSaves = useCallback(() => {
    const s = LocalStorage.getItem<GameDatabaseSave[]>("saves") || [];
    setSaves(s);
    return s;
  }, []);

  const createSave = useCallback(
    (title?: string) => {
      const currentGame = gameRef.current;

      if (currentGame.currentScene === 0) {
        return;
      }
      const saves = LocalStorage.getItem<GameDatabaseSave[]>("saves") || [];
      const date = new Date();
      saves.push({
        id: date.getTime(),
        title,
        date: date.toString(),
        game: cloneGame(currentGame),
      });
      LocalStorage.setItem<GameDatabaseSave[]>("saves", saves);
      getSaves();
    },
    [getSaves]
  );

  const deleteSave = useCallback((id: number) => {
    setSaves((_saves) => {
      _saves = _saves.filter((save) => save.id !== id);
      LocalStorage.setItem<GameDatabaseSave[]>("saves", _saves);
      return _saves;
    });
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
        LocalStorage.removeItem("game-ended");
        setGame(cloneGame(saveFind.game));
        pushNextScene(saveFind.game.currentScene);
        resolve(true);
      });
    },
    [getSaves, pushNextScene, setGame]
  );

  const getGameIsAlreadyEndedOnce = useCallback(() => {
    return !!LocalStorage.getItem<boolean>("game-already-ended-once");
  }, []);

  const clearGameData = useCallback(
    (opts: {
      includeGameAlreadyEndedOnce?: boolean;
      redirectHome?: boolean;
      hard?: boolean;
    }) => {
      const { includeGameAlreadyEndedOnce, redirectHome, hard } = opts;
      if (hard) {
        LocalStorage.clear();
      } else {
        LocalStorage.removeItem("game-ended");
        LocalStorage.removeItem("game");
      }

      if (includeGameAlreadyEndedOnce) {
        LocalStorage.removeItem("game-already-ended-once");
      }

      setGame(initialGame);
      if (redirectHome) {
        push("home");
      }
    },
    [push, setGame]
  );

  useEffect(() => {
    const data = LocalStorage.getItem<GameDatabase>("game");
    if (data) {
      setGame(cloneGame(data));
    }
    setLoaded(true);
  }, [setGame]);

  useEffect(() => {
    const { currentScene } = game;
    if (currentScene !== 0) {
      LocalStorage.setItem<GameDatabase>("game", game);
    }
  }, [game]);

  useEffect(() => {
    getSaves();
  }, [getSaves]);

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
    getGameIsAlreadyEndedOnce,
    clearGameData,
  };
};

export default useSave;
