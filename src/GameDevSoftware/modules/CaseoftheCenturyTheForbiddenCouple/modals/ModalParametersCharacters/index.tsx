import { useContext, useMemo, useState } from "react";

import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import { CharacterInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "./styles";
import ModalParametersCharactersCharacterComponent from "./ModalParametersCharactersCharacterComponent";
import UnlockContext from "../../contexts/UnlockContext";

const ModalParametersCharacters: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [character, setCharacter] = useState<CharacterInterface | null>(null);

  const click = useButtonHandleClick();

  const {
    getGameTextsNotifyByCharacterId,
    getCharacterNotifyById,
    getCharacters,
  } = useContext(UnlockContext);

  const characters = useMemo(
    () =>
      getCharacters().map((character) => ({
        ...character,
        notify:
          !!getCharacterNotifyById(character._id)?.length ||
          !!getGameTextsNotifyByCharacterId(character._id)?.length,
      })),
    [props, character, getCharacters, getCharacterNotifyById]
  );

  return (
    <>
      <ModalComponent
        title="message_1749392775687"
        open={open}
        size="default"
        inert={!!character}
        isChildren
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {characters.map((character, i) => (
              <section
                key={`params-characters-character-${character._id}`}
                className={`${!character.unLock ? "inconnu" : ""} ${character.notify ? "notify" : ""}`}
                aria-hidden={!character.unLock}
                aria-describedby={character.notify ? "notify-desc" : undefined}
                onClick={(e) => {
                  if (character.unLock) {
                    click(e, {
                      callback: () => setCharacter(character),
                      playSound: true,
                    });
                  }
                }}
                role="button"
                tabIndex={i}
              >
                <div aria-hidden="true">
                  <ImgComponent
                    src={character.primaryImage}
                    alt={
                      !character.unLock ? "message_1756477782563" : undefined
                    }
                    className="img-character"
                  />
                </div>
                <div>
                  <h3>
                    {!character.unLock ? (
                      "????"
                    ) : (
                      <TranslationComponent id={character._title} />
                    )}
                  </h3>
                </div>
                {character.notify && (
                  <span id="notify-desc" className="sr-only">
                    <TranslationComponent id="message_1759052809043" />
                  </span>
                )}
              </section>
            ))}
          </div>
        </ModalParametersCharactersContainer>
      </ModalComponent>
      <ModalParametersCharactersCharacterComponent
        onClose={() => setCharacter(null)}
        character={character}
        open={!!character}
      />
    </>
  );
};

export default ModalParametersCharacters;
