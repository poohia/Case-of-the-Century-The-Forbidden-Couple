// https://www.freepik.com/free-vector/different-aliens-monster-transparent-background_20829475.htm#query=alien%20drawing&position=0&from_view=search
// import AnimatedText from "react-animated-text-content";
import React, { useEffect, useReducer, useState } from "react";
import useRetrospacegameadventurefightsceneCharacters from "./hooks/useRetrospacegameadventurefightsceneCharacters";
import gameReducer, { gameLifeDefaultState } from "./reducers/gameReducer";

import "animate.css";

import { SceneComponentProps } from "../../../../types";
import RetrospacegameadventurefightsceneWrapper from "./RetrospacegameadventurefightsceneWrapper";
import RetrospaceadventureGameContext from "./contexts/RetrospaceadventureGameContext";
import { ThemeProvider } from "styled-components";
import { fightTheme, globalTheme } from "./themes";
import { MessageFightInfoStatus, RetrospaceadventureCharacter } from "./types";
import { useGameProvider } from "../../../../gameProvider";
import { useAssets } from "../../../../hooks";

export type RetrospacegameadventurefightsceneProps = SceneComponentProps<
  {},
  {
    enemy: string;
    hero: string;
    nbTurn: number;
    music: string;
  }
>;

const Retrospacegameadventurefightscene: RetrospacegameadventurefightsceneProps =
  (props) => {
    const {
      data: { enemy, hero, nbTurn, music, _actions },
    } = props;
    const {
      playSoundWithPreload,
      setBackgroundColor,
      setPrimaryFont,
      pauseAllSoundExcept,
      releaseSound,
    } = useGameProvider();
    const { getAssetImg } = useAssets();
    const { Hero, Enemy, setHero, setEnemy } =
      useRetrospacegameadventurefightsceneCharacters(enemy, hero);
    const [stateGame, dispatchGame] = useReducer(gameReducer, {
      ...gameLifeDefaultState,
      nbTurn,
    });
    const [messageFightInfoStatus, setMessageFightInfoStatus] =
      useState<MessageFightInfoStatus>(null);

    const { status, turn } = stateGame;

    useEffect(() => {
      setPrimaryFont("Audiowide");
    }, []);

    useEffect(() => {
      setMessageFightInfoStatus("fight");
    }, []);

    useEffect(() => {
      pauseAllSoundExcept("LaserGroove.mp3").then(() => {
        playSoundWithPreload("LaserGroove.mp3", 0.4, true);
        playSoundWithPreload(music, 1, true);
      });
      return () => {
        releaseSound(music);
      };
    }, []);

    useEffect(() => {
      if (Hero && Hero.life <= 0) {
        setMessageFightInfoStatus("loose");
        dispatchGame({ type: "gameIsFinish" });
      } else if (Enemy && Enemy.life <= 0) {
        setMessageFightInfoStatus("win");
        dispatchGame({ type: "gameIsFinish" });
      }
    }, [Hero, Enemy]);

    useEffect(() => {
      if (status === "selectionCard" && turn + 1 > nbTurn + 1) {
        setMessageFightInfoStatus("loose");
        dispatchGame({ type: "gameIsFinish" });
      } else if (status === "selectionCard" && turn > 1) {
        setMessageFightInfoStatus("nextTurn");
        setTimeout(() => setMessageFightInfoStatus(null), 2500);
      }
    }, [status, nbTurn, turn]);

    useEffect(() => {
      setBackgroundColor(
        `url("${getAssetImg(
          "backgroundprimary.png"
        )}") black no-repeat center center / cover`
      );
    }, [setBackgroundColor, getAssetImg]);

    if (!Hero || !Enemy || !_actions) {
      return <React.Fragment />;
    }

    return (
      <RetrospaceadventureGameContext.Provider
        value={{
          Hero,
          Enemy,
          stateGame,
          messageFightInfoStatus,
          nextSceneId: _actions[0]._scene,
          updateHero: setHero as React.Dispatch<
            React.SetStateAction<RetrospaceadventureCharacter>
          >,
          updateEnemy: setEnemy as React.Dispatch<
            React.SetStateAction<RetrospaceadventureCharacter>
          >,
          dispatchGame,
          sendMessageFightInfosStatus: setMessageFightInfoStatus,
        }}
      >
        <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
          <RetrospacegameadventurefightsceneWrapper />
        </ThemeProvider>
      </RetrospaceadventureGameContext.Provider>
    );
  };

export default Retrospacegameadventurefightscene;
