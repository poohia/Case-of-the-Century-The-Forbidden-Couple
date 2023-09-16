import { createContext } from "react";
import { GameReducerAction, GameReducerState } from "../reducers/gameReducer";
import {
  DamageOrHealInformationType,
  MessageFightInfoStatus,
  RetrospaceadventureCharacter,
} from "../types";

export interface GameContextInterface {
  Hero: RetrospaceadventureCharacter;
  Enemy: RetrospaceadventureCharacter;
  stateGame: GameReducerState;
  messageFightInfoStatus: MessageFightInfoStatus;
  damageOrHealInformation: DamageOrHealInformationType;
  nextSceneId: string;
  updateHero: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter>
  >;
  updateEnemy: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter>
  >;
  dispatchGame: React.Dispatch<GameReducerAction>;
  sendMessageFightInfosStatus: React.Dispatch<
    React.SetStateAction<MessageFightInfoStatus>
  >;
  sendDamageOrHealInformation: React.Dispatch<
    React.SetStateAction<DamageOrHealInformationType>
  >;
}

export const defaultGameContext: any = {
  Hero: {},
  Enemy: {},
  stateGame: {},
  damageOrHealInformation: {
    hero: { damage: 0, laser: 0 },
    enemy: { damage: 0, laser: 0 },
  },
  updateEnemy: () => {},
  updateHero: () => {},
  dispatchGame: () => {},
};

const RetrospaceadventureGameContext =
  createContext<GameContextInterface>(defaultGameContext);

export default RetrospaceadventureGameContext;
