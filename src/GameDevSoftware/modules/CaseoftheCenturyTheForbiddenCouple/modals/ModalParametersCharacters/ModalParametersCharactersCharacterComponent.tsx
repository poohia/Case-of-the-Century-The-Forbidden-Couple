import { useContext, useEffect, useMemo, useRef, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import {
  DivWithTextLock,
  ModalParametersCharactersCharacterComponentContainer,
  TextCharacterContainer,
} from "./styles";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { CharacterInterface } from "../../../../game-types";
import UnlockContext from "../../contexts/UnlockContext";

const ModalParametersCharactersCharacterComponent: React.FC<
  ModalParametersComponentProps & { character: CharacterInterface | null }
> = (props) => {
  const { open, character, ...rest } = props;

  const {
    getCharacterNotifyById,
    getGameTextsNotifyByCharacterId,
    removeCharacterNotify,
    removeGameTextsNotifyByCharacterId,
    getTextById,
  } = useContext(UnlockContext);

  const refContainer = useRef<HTMLDivElement>(null);
  const [focusNewTexts, setFocusNewTexts] = useState<boolean>(false);

  const texts = useMemo(
    () => (character ? getTextById(character._id) : []),
    [props]
  );

  const notifications: number[] = useMemo(() => {
    if (character && !getCharacterNotifyById(character._id)) {
      return getGameTextsNotifyByCharacterId(character?._id).map(
        (notify) => notify?._id || 0
      );
    }
    return [];
  }, [character]);

  useEffect(() => {
    if (character && open) {
      setTimeout(() => {
        removeCharacterNotify(character._id);
        removeGameTextsNotifyByCharacterId(character._id);
      });
    }
  }, [open, character]);

  useEffect(() => {
    if (refContainer.current && notifications.length > 0) {
      const container = refContainer.current;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });

      const timer = setTimeout(() => {
        setFocusNewTexts(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [refContainer, notifications]);

  return (
    <ModalComponent open={open} size="default" isChildren {...rest}>
      <ModalParametersCharactersCharacterComponentContainer ref={refContainer}>
        {character && (
          <div>
            <div>
              <div>
                <h3>{character._title}</h3>
                <div>
                  <p>
                    <TranslationComponent id="message_1749661673399" />
                  </p>
                  <p>
                    <b>
                      <TranslationComponent id={character.race} />
                    </b>
                  </p>
                </div>
                <div>
                  <p>
                    <TranslationComponent id="message_1749662004875" />
                  </p>
                  <p>
                    <b>{character.age}</b>
                  </p>
                </div>
                <div>
                  <p>
                    <TranslationComponent id="message_1749651050161" />
                  </p>
                  <p>
                    <b>
                      <TranslationComponent id={character.job} />
                    </b>
                  </p>
                </div>
              </div>
              <div>
                <ImgComponent
                  src={character.idleImage ?? character.primaryImage}
                  className="image-primary"
                  forceMaxSize={false}
                />
              </div>
            </div>
            {texts.map((text) =>
              text.unLock ? (
                <TextCharacterContainer
                  key={`text-character-${character?._id}-${text._id}`}
                  className={
                    notifications.includes(text._id)
                      ? focusNewTexts
                        ? "animate__animated animate__flipInX"
                        : "hidden"
                      : ""
                  }
                >
                  <TranslationComponent id={text.value} />
                </TextCharacterContainer>
              ) : (
                <DivWithTextLock
                  key={`text-character-${character?._id}-${text._id}`}
                >
                  <span>
                    <TranslationComponent id={text.value} />
                  </span>
                </DivWithTextLock>
              )
            )}
          </div>
        )}
      </ModalParametersCharactersCharacterComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersCharactersCharacterComponent;
