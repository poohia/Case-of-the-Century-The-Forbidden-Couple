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

type UnLockProps = {
  unlockTexts?: UnlockText[];
  unlockCharacter?: UnlockCharacter[];
  unlockScenario?: UnlockScenario[];
  unlockNoteInspecteur?: UnlockNoteInspecteur[];
};

const useUnlock = (props?: UnLockProps) => {
  const { saveData, getData } = useGameProvider();
  const { getGameObjectsFromType } = useGameObjects();

  const charactersIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockCharacter") || [],
    [props]
  );
  const gameTextsIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockTexts") || [],
    [props]
  );
  const scenariosIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockScenario") || [],
    [props]
  );
  const noteInspecteursIdsFromDatabase = useMemo(
    () => getData<string[]>("unlockNoteInspecteur") || [],
    [props]
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
      if (args?.unlockCharacter) {
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
      if (args?.unlockTexts) {
        const ids = args.unlockTexts.map((c) => c.text.replace("@go:", ""));
        saveData(
          "unlockTexts",
          gameTextsIdsFromDatabase.filter((id) => !ids.includes(id)).concat(ids)
        );
      }
      if (args?.unlockScenario) {
        const ids = args.unlockScenario.map((c) =>
          c.scenario.replace("@go:", "")
        );
        saveData(
          "unlockScenario",
          scenariosIdsFromDatabase.filter((id) => !ids.includes(id)).concat(ids)
        );
      }
      if (args?.unlockNoteInspecteur) {
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
    },
    [
      charactersIdsFromDatabase,
      gameTextsIdsFromDatabase,
      scenariosIdsFromDatabase,
      noteInspecteursIdsFromDatabase,
    ]
  );

  useEffect(() => {
    if (props) {
      unLock(props);
    }
  }, [props]);

  return {
    getCharacters,
    getTextById,
    getScenarios,
    getNotesInspecteur,
  };
};
export default useUnlock;
