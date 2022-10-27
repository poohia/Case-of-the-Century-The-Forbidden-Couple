import { createContext } from "react";
import { GameReducerAction, GameReducerState } from "../reducers/gameReducer";
import { RetrospaceadventureCharacter } from "../types";

interface GameContextInterface {
  Hero: RetrospaceadventureCharacter;
  Enemy: RetrospaceadventureCharacter;
  stateGame: GameReducerState;
  updateHero: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter>
  >;
  updateEnemy: React.Dispatch<
    React.SetStateAction<RetrospaceadventureCharacter>
  >;
  dispatchGame: React.Dispatch<GameReducerAction>;
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
