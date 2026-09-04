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

  const containerRef = useRef<HTMLDivElement>(null);
  const firstNotificationRef = useRef<HTMLParagraphElement>(null);
  const [focusNewTexts, setFocusNewTexts] = useState<boolean>(false);
  const [displayedNotifications, setDisplayedNotifications] = useState<
    number[]
  >([]);

  const texts = useMemo(
    () => (character ? getTextById(character._id) : []),
    [character, getTextById]
  );
  console.log(
    "🚀 ~ ModalParametersCharactersCharacterComponent ~ texts:",
    texts,
    character?._id
  );

  const notifications: number[] = useMemo(() => {
    if (character && !getCharacterNotifyById(character._id)) {
      return getGameTextsNotifyByCharacterId(character?._id).map(
        (notify) => notify?._id || 0
      );
    }
    return [];
  }, [character, getCharacterNotifyById, getGameTextsNotifyByCharacterId]);

  const firstNotificationId = useMemo(
    () => displayedNotifications[0],
    [displayedNotifications]
  );

  useEffect(() => {
    setFocusNewTexts(false);
    setDisplayedNotifications(open ? notifications : []);
  }, [character?._id, open]);

  useEffect(() => {
    if (character && open) {
      const timer = setTimeout(() => {
        removeCharacterNotify(character._id);
        removeGameTextsNotifyByCharacterId(character._id);
      });

      return () => clearTimeout(timer);
    }
  }, [
    open,
    character,
    removeCharacterNotify,
    removeGameTextsNotifyByCharacterId,
  ]);

  useEffect(() => {
    if (
      open &&
      containerRef.current &&
      firstNotificationRef.current &&
      displayedNotifications.length > 0
    ) {
      const container = containerRef.current;
      const target = firstNotificationRef.current;
      const targetTop =
        target.getBoundingClientRect().top -
        container.getBoundingClientRect().top +
        container.scrollTop;

      container.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });

      const timer = setTimeout(() => {
        setFocusNewTexts(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [open, displayedNotifications]);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={character?._title}
      idDescription="message_1770976912532"
      isChildren
      {...rest}
    >
      <ModalParametersCharactersCharacterComponentContainer ref={containerRef}>
        <TranslationComponent id="message_1770976912532" srOnly />
        {character && (
          <div>
            <div aria-hidden={focusNewTexts}>
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
                  aria-hidden={
                    focusNewTexts
                      ? !displayedNotifications.includes(text._id)
                      : false
                  }
                  className={
                    displayedNotifications.includes(text._id)
                      ? focusNewTexts
                        ? "animate__animated animate__flipInX"
                        : "hidden"
                      : ""
                  }
                  ref={
                    text._id === firstNotificationId
                      ? firstNotificationRef
                      : undefined
                  }
                >
                  <TranslationComponent id={text.value} />
                  <br /> <br />
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
