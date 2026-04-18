import styled from "styled-components";

import "animate.css";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  AnimationImgsComponent,
  ButtonClassicGroupComponent,
  TranslationComponent,
} from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../../components/ButtonClassicComponent";
import { EndDemoBlurContainer, EndDemoComponentContainer } from "./EndDemo";

// const EndDemoComponentContainer = styled.div<{ $backgroundUrl: string }>`
//   height: 100%;
//   background: url(${(props) => props.$backgroundUrl}) no-repeat center;
//   background-size: cover;
//   > div {
//     position: absolute;
//     top: 0;
//     left: 0%;
//     width: calc(100% - var(--sal) - var(--sar));
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     color: white;
//     padding: 10px var(--sar) 10px var(--sal);
//     h1 {
//       span {
//         font-size: clamp(
//           1.8rem,
//           6vw,
//           4rem
//         ); // Ex: min 1.8rem, idéal 4vw, max 4rem
//       }
//       text-align: center;
//     }
//     span {
//       font-size: clamp(1.1rem, 4vw, 1.4rem);
//       text-align: center;
//       width: 100%;
//       line-height: ${({ theme }) => theme.fonts.lineHeight};
//     }
//     > div {
//       width: 96%;
//       max-width: 1000px;
//       margin: 8px 0;
//       &:nth-child(2) {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }
//     }
//   }
// `;

const Credits = () => {
  const {
    getAssetImg,
    getValueFromConstant,
    push,
    releaseAllMusic,
    playMusic,
    getCredits,
  } = useGameProvider();
  const [blur, setBlur] = useState<number>(0);

  const finalLink = useMemo(() => getValueFromConstant("discord_link"), []);

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

  useEffect(() => {
    setTimeout(() => {
      setBlur(4);
    }, 2200);
  }, []);

  return (
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
          <EndDemoComponentContainer>
            <div>
              <h1>
                <TranslationComponent id="label_credits" />
              </h1>
              <div>
                {getCredits().map((credit) => (
                  <div key={credit.title}>
                    <h2>{credit.title}</h2>
                    {credit.persons.map((person) => (
                      <div key={`${credit.title}-${person.name}`}>
                        <h4>
                          <span>{person.name}</span> -{" "}
                          <TranslationComponent id={person.title} />
                        </h4>
                      </div>
                    ))}
                  </div>
                ))}
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
  );
};

export default Credits;
