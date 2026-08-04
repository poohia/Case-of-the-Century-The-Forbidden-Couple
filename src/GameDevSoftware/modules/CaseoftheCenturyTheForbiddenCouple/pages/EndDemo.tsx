import { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import {
  AnimationImgsComponent,
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import PointsGameComponent from "../components/PointsGameComponent";
import usePointsGame from "../hooks/usePointsGame";
import ButtonMenuPauseSceneComponent from "../components/ButtonMenuPauseSceneComponent";
import ModalParametersGameComponent from "../modals/ModalParametersGameComponent";
import SceneWrapper from "../scenes/SceneWrapper";
import { ButtonClassicType } from "../../../../components/ButtonClassicComponent";

export const EndDemoBlurContainer = styled.div`
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const EndDemoComponentContainer = styled.div`
  height: 100%;
  > div {
    position: absolute;
    top: 0;
    left: 0%;
    width: calc(100% - var(--sal) - var(--sar));
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 10px var(--sar) 10px var(--sal);
    h1 {
      span {
        font-size: clamp(
          1.8rem,
          6vw,
          4rem
        ); // Ex: min 1.8rem, idéal 4vw, max 4rem
      }
      text-align: center;
    }
    span {
      font-size: clamp(1.1rem, 4vw, 1.4rem);
      text-align: center;
      width: 100%;
      line-height: ${({ theme }) => theme.fonts.lineHeight};
    }
    > div {
      width: 96%;
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

const EndDemo = () => {
  const { getValueFromConstant, push, releaseAllMusic, playMusic } =
    useGameProvider();

  const [blur, setBlur] = useState<number>(0);

  const { points } = usePointsGame();
  // const finalLink = useMemo(() => getValueFromConstant("discord_link"), []);
  const finalLink = useMemo(() => getValueFromConstant("google_form_link"), []);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    releaseAllMusic("Visual Novel_Menu_Musique.mp3").then(() => {
      playMusic({
        sound: "Visual Novel_Menu_Musique.mp3",
      });
    });
  }, []);

  const buttonsAction = useMemo<ButtonClassicType[]>(() => {
    const menu = [
      {
        key: "backHome",
        idText: "message_1749394728402",
        animate: false,
      },
      {
        key: "discordLink",
        idText: "label_google_form",
        animate: false,
      },
      // {
      //   key: "discordLink",
      //   idText: "label_discord",
      //   animate: false,
      // },
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

  useEffect(() => {
    setTimeout(() => {
      setBlur(4);
    }, 2200);
  }, []);

  return (
    <SceneWrapper data={{}}>
      <div>
        <AnimationImgsComponent
          imgs={[
            "COMMISSARIAT LUMIERE 1.webp",
            "COMMISSARIAT LUMIERE 2.webp",
            "COMMISSARIAT LUMIERE 3.webp",
            "COMMISSARIAT LUMIERE 4.webp",
          ]}
          isBackground
        />
        {blur > 0 && (
          <EndDemoBlurContainer className="animate__animated animate__delay-2s animate__fadeIn">
            <PointsGameComponent points={points} />
            <EndDemoComponentContainer>
              <div>
                <ButtonMenuPauseSceneComponent
                  handleClick={() => {
                    setOpenMenu(true);
                  }}
                />
                <h1>
                  <TranslationComponent id="message_1759067833909" />
                </h1>
                <div>
                  <TranslationComponent id={"text_end_demo"} />
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
          </EndDemoBlurContainer>
        )}
      </div>
      <ModalParametersGameComponent
        open={openMenu}
        onClose={() => {
          setOpenMenu(false);
        }}
      />
    </SceneWrapper>
  );
};

export default EndDemo;
