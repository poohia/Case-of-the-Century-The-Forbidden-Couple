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
import {
  PaperSheet,
  PaperSheetActions,
  PaperSheetContent,
  PaperSheetHeader,
  PaperSheetOverlay,
} from "../components/PaperSheetComponent";

export const EndDemoBlurContainer = styled.div`
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

const EndDemoOverlay = styled(PaperSheetOverlay)`
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  /* écran peu haut: laisse la place aux points et à la loupe sur les côtés */
  @media (max-height: 480px) {
    padding-left: max(110px, var(--sal));
    padding-right: max(110px, var(--sar));
  }
`;

const EndDemoText = styled.p`
  margin: 18px 0 0;
  font-size: clamp(1rem, 0.85rem + 0.7vw, 1.3rem);
  line-height: 1.5;
  text-align: center;

  span {
    font-size: inherit;
  }

  @media (max-height: 480px) {
    margin-top: 10px;
    line-height: 1.4;
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
          <>
            <PointsGameComponent points={points} />
            <EndDemoOverlay className="animate__animated animate__delay-2s animate__fadeIn">
              <PaperSheet>
                <PaperSheetContent>
                  <PaperSheetHeader>
                    <h1>
                      <TranslationComponent id="message_1759067833909" />
                    </h1>
                  </PaperSheetHeader>
                  <EndDemoText>
                    <TranslationComponent id={"text_end_demo"} />
                  </EndDemoText>
                </PaperSheetContent>
                <PaperSheetActions>
                  <ButtonClassicGroupComponent
                    buttons={buttonsAction}
                    show
                    onClick={handleClickButtonsAction}
                    direction="row"
                  />
                </PaperSheetActions>
              </PaperSheet>
            </EndDemoOverlay>
            <ButtonMenuPauseSceneComponent
              handleClick={() => {
                setOpenMenu(true);
              }}
            />
          </>
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
