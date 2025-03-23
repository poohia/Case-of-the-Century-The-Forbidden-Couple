import { ThemeProvider } from "styled-components";

import { SceneComponentProps } from "../../../../../../types";
import { fightTheme, globalTheme } from "../../themes";
import { PageComponent } from "../../../../../../components";
import { CenterContainer, FightContainer } from "./styled";
import { useAssets } from "../../../../../../hooks";
import EnemyBarComponent from "./EnemyBarComponent";
import HeroBarComponent from "./HeroBarComponent";
import useFinalFight from "./hooks/useFinalFight";

import "animate.css";
import MiniGameComponent from "./components/MiniGameComponent";

export type UseFinalFightDataProps = {
  backgroundImage: string;
  enemy: string;
  hero: string;
};

export type RetrospacegameFightFinalSceneProps = SceneComponentProps<
  {},
  UseFinalFightDataProps
>;
const RetrospacegameFightFinalScene: RetrospacegameFightFinalSceneProps = (
  props
) => {
  const {
    data: { backgroundImage, enemy, hero },
  } = props;
  const {
    characterEnemy,
    characterHero,
    enemyLife,
    heroLife,
    action,
    miniGame,
    startMiniGame,
    handleStartMiniGame,
    handleOnWinMinigame,
  } = useFinalFight({
    enemy,
    hero,
  });
  const { getAssetImg } = useAssets();

  return (
    <ThemeProvider theme={{ ...globalTheme, ...fightTheme }}>
      <PageComponent>
        <CenterContainer>
          <FightContainer backgroundImage={getAssetImg(backgroundImage)}>
            <EnemyBarComponent
              action={action}
              character={characterEnemy}
              life={enemyLife}
              onSelectMiniGame={handleStartMiniGame}
            />
            <HeroBarComponent character={characterHero} life={heroLife} />
            {startMiniGame && miniGame && (
              <MiniGameComponent
                miniGame={miniGame}
                onWin={handleOnWinMinigame}
                onLoose={handleOnWinMinigame}
              />
            )}
          </FightContainer>
        </CenterContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default RetrospacegameFightFinalScene;
