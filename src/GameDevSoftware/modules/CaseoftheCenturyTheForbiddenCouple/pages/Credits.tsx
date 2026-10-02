import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import LocalStorage from "@awesome-cordova-library/localstorage";

import {
  AnimationImgsComponent,
  ButtonClassicGroupComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { useGameProvider } from "../../../../gameProvider";
import { ButtonClassicType } from "../../../../components/ButtonClassicComponent";
import { EndDemoBlurContainer } from "./EndDemo";
import {
  PaperSheet,
  PaperSheetActions,
  PaperSheetContent,
  PaperSheetHeader,
  PaperSheetLayout,
} from "../components/PaperSheetComponent";
import { CreditsBlock, CreditsPerson } from "./CreditsStyled";

// animate__delay-2s + animate__fadeIn
const FADE_IN_DURATION = 3000;
const AUTO_SCROLL_DELAY = 2000;
// pixels par seconde
const AUTO_SCROLL_SPEED = 30;

// Paramètres envoyés par le bouton "Crédits" de l'accueil
type CreditsFromHomeParams = {
  fromHome?: boolean;
  gameEnded?: boolean | null;
  gameAlreadyEndedOnce?: boolean | null;
};

const Credits = () => {
  const {
    parameters: { screenReaderEnabled },
    params,
    getValueFromConstant,
    push,
    releaseAllMusic,
    playMusic,
    getCredits,
  } = useGameProvider();
  const [blur, setBlur] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const finalLink = useMemo(() => getValueFromConstant("discord_link"), []);

  useEffect(() => {
    releaseAllMusic("Visual Novel_Menu_Musique.mp3").then(() => {
      playMusic({
        sound: "Visual Novel_Menu_Musique.mp3",
      });
    });
  }, []);

  // Ouverte depuis l'accueil, la page ne doit pas marquer la partie comme
  // terminée (sinon "Continuer" renvoie aux crédits)
  useEffect(() => {
    const fromHomeParams = params as CreditsFromHomeParams | undefined;
    if (!fromHomeParams?.fromHome) {
      return;
    }
    const flags = {
      "game-ended": fromHomeParams.gameEnded,
      "game-already-ended-once": fromHomeParams.gameAlreadyEndedOnce,
    };
    Object.entries(flags).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        LocalStorage.removeItem(key);
      } else {
        LocalStorage.setItem(key, value);
      }
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

  // Défilement automatique de la liste, comme un générique. Le joueur reprend
  // la main dès qu'il touche à la liste.
  useEffect(() => {
    const content = contentRef.current;
    if (blur === 0 || screenReaderEnabled || !content) {
      return;
    }

    let frame = 0;
    let lastTime = 0;
    let position = 0;

    const step = (time: number) => {
      const max = content.scrollHeight - content.clientHeight;
      position = Math.min(
        position + ((time - lastTime) / 1000) * AUTO_SCROLL_SPEED,
        max
      );
      lastTime = time;
      content.scrollTop = position;
      if (position < max) {
        frame = requestAnimationFrame(step);
      }
    };

    const timer = setTimeout(() => {
      position = content.scrollTop;
      lastTime = performance.now();
      frame = requestAnimationFrame(step);
    }, FADE_IN_DURATION + AUTO_SCROLL_DELAY);

    const stop = () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    const userEvents = ["wheel", "touchstart", "pointerdown"];
    userEvents.forEach((event) =>
      content.addEventListener(event, stop, { passive: true })
    );

    return () => {
      stop();
      userEvents.forEach((event) => content.removeEventListener(event, stop));
    };
  }, [blur, screenReaderEnabled]);

  return (
    <PageComponent>
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
          <PaperSheetLayout>
            <PaperSheet>
              <PaperSheetContent ref={contentRef}>
                <PaperSheetHeader>
                  <p>
                    <TranslationComponent id="game_title_1" /> ·{" "}
                    <TranslationComponent id="game_title_2" />
                  </p>
                  <h1>
                    <TranslationComponent id="label_credits" />
                  </h1>
                </PaperSheetHeader>
                {getCredits().map((credit) => (
                  <CreditsBlock key={credit.title}>
                    <h2>{credit.title}</h2>
                    <dl>
                      {credit.persons.map((person) => (
                        <CreditsPerson key={`${credit.title}-${person.name}`}>
                          <dt>
                            <TranslationComponent id={person.title} />
                          </dt>
                          <dd>{person.name}</dd>
                        </CreditsPerson>
                      ))}
                    </dl>
                  </CreditsBlock>
                ))}
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
          </PaperSheetLayout>
        </EndDemoBlurContainer>
      )}
    </PageComponent>
  );
};

export default Credits;
