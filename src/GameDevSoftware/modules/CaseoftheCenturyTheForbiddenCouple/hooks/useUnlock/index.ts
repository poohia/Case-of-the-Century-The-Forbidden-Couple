import { useCallback, useEffect, useMemo } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import {
  CharacterInterface,
  GameTextsInterface,
  NoteInspecteurInterface,
  ScenarioInterface,
  UnlockCharacter,
  UnlockNoteInspecteur,
  UnlockScenario,
  UnlockText,
} from "../../../../game-types";
import { useGameObjects } from "../../../../../hooks";
import useNotify from "../useNotify";

export type UnLockProps = {
  unlockTexts?: UnlockText[];
  unlockCharacter?: UnlockCharacter[];
  unlockScenario?: UnlockScenario[];
  unlockNoteInspecteur?: UnlockNoteInspecteur[];
};

const useUnlock = (props?: UnLockProps) => {
  const { saveData, getData } = useGameProvider();
  const { getGameObjectsFromType } = useGameObjects();

  const notifyRest = useNotify();
  const {
    addGameTextsNotify,
    addCharacterNotify,
    addScenarioNotify,
    addNotesInspecteurNotify,
  } = notifyRest;

  const charactersIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockCharacter") || [],
    [props, getData]
  );
  const gameTextsIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockTexts") || [],
    [props, getData]
  );
  const scenariosIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockScenario") || [],
    [props, getData]
  );
  const noteInspecteursIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockNoteInspecteur") || [],
    [props, getData]
  );

  const getCharacters = useCallback(() => {
    return getGameObjectsFromType<CharacterInterface>("character").map(
      (character) => ({
        ...character,
        unLock: charactersIdsFromDatabase?.includes(character._id.toString()),
      })
    );
  }, [charactersIdsFromDatabase]);

  const getTextById = useCallback(
    (id: number) => {
      return getGameObjectsFromType<GameTextsInterface>("gameTexts")
        .filter((text) => text.object.includes(id.toString()))
        .map((text) => ({
          ...text,
          unLock: gameTextsIdsFromDatabase?.includes(text._id.toString()),
        }));
    },
    [gameTextsIdsFromDatabase]
  );

  const getScenarios = useCallback(() => {
    return getGameObjectsFromType<ScenarioInterface>("scenario").map(
      (scenario) => ({
        ...scenario,
        unLock: scenariosIdsFromDatabase?.includes(scenario._id.toString()),
      })
    );
  }, [scenariosIdsFromDatabase]);

  const getNotesInspecteur = useCallback(() => {
    return getGameObjectsFromType<NoteInspecteurInterface>(
      "noteInspecteur"
    ).map((noteInspecteur) => ({
      ...noteInspecteur,
      unLock: noteInspecteursIdsFromDatabase?.includes(
        noteInspecteur._id.toString()
      ),
    }));
  }, [noteInspecteursIdsFromDatabase]);

  const unLock = useCallback(
    (args: UnLockProps) => {
      return Promise.all<void>([
        new Promise<void>((resolve) => {
          if (args?.unlockCharacter?.length) {
            const ids = args.unlockCharacter.map((c) =>
              c.character.replace("@go:", "")
            );
            saveData(
              "unlockCharacter",
              charactersIdsFromDatabase
                .filter((id) => !ids.includes(id))
                .concat(ids)
            );
          }
          if (args?.unlockTexts?.length) {
            const ids = args.unlockTexts.map((c) => c.text.replace("@go:", ""));
            saveData(
              "unlockTexts",
              gameTextsIdsFromDatabase
                .filter((id) => !ids.includes(id))
                .concat(ids)
            );
          }
          if (args?.unlockScenario?.length) {
            const ids = args.unlockScenario.map((c) =>
              c.scenario.replace("@go:", "")
            );
            saveData(
              "unlockScenario",
              scenariosIdsFromDatabase
                .filter((id) => !ids.includes(id))
                .concat(ids)
            );
          }
          if (args?.unlockNoteInspecteur?.length) {
            const ids = args.unlockNoteInspecteur.map((c) =>
              c.noteInspecteur.replace("@go:", "")
            );
            saveData(
              "unlockNoteInspecteur",
              noteInspecteursIdsFromDatabase
                .filter((id) => !ids.includes(id))
                .concat(ids)
            );
          }
          resolve();
        }),
        new Promise<void>((resolve) => {
          if (args?.unlockTexts?.length) {
            const ids = args.unlockTexts.map((c) => c.text.replace("@go:", ""));
            if (!gameTextsIdsFromDatabase.find((id) => ids.includes(id))) {
              addGameTextsNotify(ids);
            }
          }
          if (args?.unlockCharacter?.length) {
            const ids = args.unlockCharacter.map((c) =>
              c.character.replace("@go:", "")
            );
            if (!charactersIdsFromDatabase.find((id) => ids.includes(id))) {
              addCharacterNotify(ids);
            }
          }
          if (args?.unlockScenario?.length) {
            const ids = args.unlockScenario.map((c) =>
              c.scenario.replace("@go:", "")
            );
            if (!scenariosIdsFromDatabase.find((id) => ids.includes(id))) {
              addScenarioNotify(ids);
            }
          }
          if (args?.unlockNoteInspecteur?.length) {
            const ids = args.unlockNoteInspecteur.map((c) =>
              c.noteInspecteur.replace("@go:", "")
            );
            if (
              !noteInspecteursIdsFromDatabase.find((id) => ids.includes(id))
            ) {
              addNotesInspecteurNotify(ids);
            }
          }

          resolve();
        }),
      ]);
    },
    [
      charactersIdsFromDatabase,
      gameTextsIdsFromDatabase,
      scenariosIdsFromDatabase,
      noteInspecteursIdsFromDatabase,
      addCharacterNotify,
    ]
  );

  useEffect(() => {
    if (props) {
      unLock(props);
    }
  }, [props]);

  return {
    unLock,
    getCharacters,
    getTextById,
    getScenarios,
    getNotesInspecteur,
    /** */
    ...notifyRest,
  };
};
export default useUnlock;
