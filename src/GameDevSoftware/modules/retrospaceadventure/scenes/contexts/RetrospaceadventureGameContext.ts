import { createContext } from "react";
import { GameReducerAction, GameReducerState } from "../reducers/gameReducer";
import { MessageFightInfoStatus, RetrospaceadventureCharacter } from "../types";

export interface GameContextInterface {
  Hero: RetrospaceadventureCharacter;
  Enemy: RetrospaceadventureCharacter;
  stateGame: GameReducerState;
  messageFightInfoStatus: MessageFightInfoStatus;
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
}

const defaultContext: any = {
  Hero: {},
  Enemy: {},
  stateGame: {},
  updateEnemy: () => {},
  updateHero: () => {},
  dispatchGame: () => {},
};

const RetrospaceadventureGameContext =
  createContext<GameContextInterface>(defaultContext);

export default RetrospaceadventureGameContext;
