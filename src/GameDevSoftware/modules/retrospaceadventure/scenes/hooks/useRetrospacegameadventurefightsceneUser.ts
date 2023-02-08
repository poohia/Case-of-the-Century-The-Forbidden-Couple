import { useCallback, useContext } from "react";
import { RetrospaceadventureCard } from "../types";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";
import { calculPercent } from "../utils";

const useRetrospacegameadventurefightsceneUser = () => {
  const {
    stateGame: { nbTurn, turn },
  } = useContext(RetrospaceadventureGameContext);

  const generateCard = useCallback(
    (cards: RetrospaceadventureCard[]) => {
      let card;
      console.log(
        "🚀 ~ file: useRetrospacegameadventurefightsceneUser.ts:13 ~ generateCard ~ nbTurn",
        turn,
        calculPercent(turn, nbTurn)
      );
      card = cards[Math.floor(Math.random() * cards.length)];
      return card;
    },
    [turn, nbTurn]
  );

  return generateCard;
};
export default useRetrospacegameadventurefightsceneUser;
