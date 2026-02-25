import { useContext, useEffect, useMemo, useRef, useState } from "react";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import {
  DivWithTextLock,
  ImgPalaroid,
  ModalParametersCharactersCharacterComponentContainer,
  TextCharacterContainer,
} from "./styles";
import { CharacterInterface } from "../../../../game-types";
import UnlockContext from "../../contexts/UnlockContext";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";

const ModalParametersCharactersCharacterComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    character: CharacterInterface | null;
  }
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
    <ModalComponent
      open={open}
      size="default"
      title={character?._title}
      idDescription="message_1770976912532"
      isChildren
      {...rest}
    >
      <ModalParametersCharactersCharacterComponentContainer ref={refContainer}>
        <TranslationComponent id="message_1770976912532" className="sr-only" />
        {character && (
          <div>
            <div>
              <div>
                <dl>
                  <div>
                    <dt>
                      <TranslationComponent id="message_1749661673399" />
                    </dt>
                    <dd>
                      <b>
                        <TranslationComponent id={character.race} />
                      </b>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <TranslationComponent id="message_1749662004875" />
                    </dt>
                    <dd>
                      <b>{character.age}</b>
                    </dd>
                  </div>
                  <div>
                    <dt>
                      <TranslationComponent id="message_1749651050161" />
                    </dt>
                    <dd>
                      <b>
                        <TranslationComponent id={character.job} />
                      </b>
                    </dd>
                  </div>
                </dl>
              </div>
              <ImgPalaroid aria-hidden={true}>
                <ImgComponent
                  src={character.idleImage ?? character.primaryImage}
                  className="image-primary"
                  forceMaxSize={false}
                  aria-hidden={true}
                />
              </ImgPalaroid>
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
                  aria-hidden={true}
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
