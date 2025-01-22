import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import ChatGPTTypewriterEffect from "react-chatgpt-typewriter";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { ActionOfScene } from "../../../../../types";
import {
  ActionsContainer,
  IconsContainer,
  TextContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";
import "react-chatgpt-typewriter/lib/index.css";

let timer: NodeJS.Timeout | null = null;

const RetrospacegameadventuredialogsceneTextComponent: React.FC<{
  textContent: string;
  minigames: { thumbnail: string }[];
  _actions: ActionOfScene[];
  onClickCards: () => void;
  onClickMinigame: (minigame: any) => void;
}> = ({ textContent, minigames, _actions, onClickCards, onClickMinigame }) => {
  const [showFightButton, setShowFightButton] = useState<boolean>(false);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainer = useCallback(() => {
    // setTimeout(() => {
    if (textContainerRef.current) {
      const { scrollHeight } = textContainerRef.current;
      textContainerRef.current.scrollTo({
        top: scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    // }, 200);
  }, [textContainerRef]);
  const { translateText, nextScene } = useGameProvider();

  useEffect(() => {
    timer = setInterval(() => scrollContainer(), 1000);
  });

  return (
    <TextContainer ref={textContainerRef}>
      <ChatGPTTypewriterEffect
        delay={30}
        cursor={{
          width: "14px",
          height: "22px",
          marginLeft: "5px",
        }}
        // onChange={scrollContainer}
        onFinished={() => {
          timer && clearInterval(timer);
          setTimeout(() => setShowFightButton(true), 100);
          setTimeout(() => scrollContainer(), 200);
        }}
        text={translateText(textContent)}
        hideWhenFinished
      />
      <ActionsContainer>
        {showFightButton &&
          _actions.map((action, i) => (
            <Fragment key={`retrospaceadventure-dialog-scene-action-${i}`}>
              {/* <RetrospacegameadventureButtonComponent
              onClick={() => {
                nextScene(action._scene);
              }}
            >
              <TranslationComponent id={action._title} />
            </RetrospacegameadventureButtonComponent> */}
              {action._title && (
                <RetrospaceadventureButtonComponent
                  fluid
                  onClick={() => nextScene(action._scene)}
                  text={action._title}
                />
              )}
            </Fragment>
          ))}
      </ActionsContainer>
      {/* </div> */}
      {/* <div>
        <h4>
          <TranslationComponent id="retrospaceadventure_dialog_label_actions" />
        </h4>
      </div> */}
      {/* <IconsContainer>
        {minigames.map((minigame) => (
          <ImgComponent
            key={`minigame-thumbnail-${minigame.thumbnail}`}
            src={minigame.thumbnail}
            onClick={() => onClickMinigame(minigame)}
          />
        ))}
        <ImgComponent src={"cards-preview.png"} onClick={onClickCards} />
      </IconsContainer> */}
    </TextContainer>
  );
};

export default RetrospacegameadventuredialogsceneTextComponent;
