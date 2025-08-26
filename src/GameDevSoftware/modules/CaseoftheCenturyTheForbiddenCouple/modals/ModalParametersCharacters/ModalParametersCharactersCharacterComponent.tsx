import ModalComponent from "../../components/ModalComponent";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import {
  DivWithTextLock,
  ModalParametersCharactersCharacterComponentContainer,
  TextCharacterContainer,
} from "./styles";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { CharacterInterface } from "../../../../game-types";
import { useMemo } from "react";
import useUnlock from "../../hooks/useUnlock";

const ModalParametersCharactersCharacterComponent: React.FC<
  ModalParametersComponentProps & { character: CharacterInterface | null }
> = (props) => {
  const { open, character, ...rest } = props;

  const { getTextById } = useUnlock();

  const texts = useMemo(
    () => (character ? getTextById(character._id) : []),
    [props]
  );

  return (
    <ModalComponent open={open} size="default" isChildren {...rest}>
      <ModalParametersCharactersCharacterComponentContainer>
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
                  forceMaxSize={!!character.idleImage}
                />
              </div>
            </div>
            {texts.map((text) =>
              text.unLock ? (
                <TextCharacterContainer
                  key={`text-character-${character?._id}-${text._id}`}
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
