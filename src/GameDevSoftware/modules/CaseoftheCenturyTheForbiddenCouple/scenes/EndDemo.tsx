import styled, { ThemeProvider } from "styled-components";

import "animate.css";
import { PageComponent, TranslationComponent } from "../../../../components";
import { globalTheme } from "../theme";
import { SceneComponentProps } from "../../../../types";
import { useScene } from "../../../../hooks";
import { useGameProvider } from "../../../../gameProvider";
import { EndDemoProps } from "../../../game-types";
import { useCallback, useEffect, useMemo } from "react";
import PointsGameComponent from "../components/PointsGameComponent";
import usePointsGame from "../hooks/usePointsGame";
import { ButtonClassicType } from "../types";
import ButtonClassicGroupComponent from "../components/ButtonClassicGroupComponent";

const EndDemoComponentContainer = styled.div<{ $backgroundUrl: string }>`
  height: 100%;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;
  border-radius: 10px;
  > div {
    position: absolute;
    top: 0;
    left: 0%;
    width: calc(100% - 20px);
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px;
    h1 {
      font-size: clamp(
        1.8rem,
        6vw,
        4rem
      ); // Ex: min 1.8rem, idéal 4vw, max 4rem
      text-align: center;
    }
    span {
      font-size: clamp(1.1rem, 4vw, 1.4rem);
      text-align: center;
      width: 100%;
      line-height: 32px;
    }
    > div {
      width: 100%;
      max-width: 1000px;
      margin: 8px 0;
      &:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;

export type EndDemoComponentProps = SceneComponentProps<{}, EndDemoProps>;

const EndDemo: EndDemoComponentProps = (props) => {
  const {
    data: { backgroundImage, discordLink, text },
  } = props;
  const { getAssetImg, getValueFromConstant, push } = useGameProvider();
  const { nextScene } = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 0.4,
      },
    ],
  });
  const { points } = usePointsGame();
  const finalLink = useMemo(() => getValueFromConstant(discordLink), []);

  useEffect(() => {
    setTimeout(() => {
      nextScene();
    }, 3500);
  }, []);

  console.log("🚀 ~ discordLink:", finalLink);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "backHome",
        idText: "message_1749394728402",
        animate: true,
      },
      {
        key: "discordLink",
        idText: "label_discord",
        animate: true,
      },
    ];
    return menu;
  }, []);

  const handleClickButtonsAction = useCallback(
    (key: string) => {
      switch (key) {
        case "backHome":
          push("home");
          break;
        case "discordLink":
          window.open(finalLink, "_system");
          break;
      }
    },
    [finalLink]
  );

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent maxSize={{ width: 1920, height: 1080 }}>
        <div>
          <PointsGameComponent points={points} />
          <EndDemoComponentContainer
            $backgroundUrl={getAssetImg(backgroundImage)}
          >
            <div>
              <h1>Fin de la démo</h1>
              <div>
                <TranslationComponent id={text} />
              </div>
              <div>
                <ButtonClassicGroupComponent
                  buttons={buttonsAction}
                  show
                  onClick={handleClickButtonsAction}
                  direction="row"
                />
              </div>
            </div>
          </EndDemoComponentContainer>
        </div>
      </PageComponent>
    </ThemeProvider>
  );
};

export default EndDemo;
