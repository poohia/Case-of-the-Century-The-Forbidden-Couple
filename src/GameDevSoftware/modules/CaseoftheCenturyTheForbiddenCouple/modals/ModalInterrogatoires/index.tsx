import { useContext, useMemo, useState } from "react";

import { useButtonHandleClick, useGameObjects } from "../../../../../hooks";
import { CharacterInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
// import { ModalParametersCharactersContainer } from "./styles";
// import ModalParametersCharactersCharacterComponent from "./ModalParametersCharactersCharacterComponent";
import UnlockContext from "../../contexts/UnlockContext";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalInterrogatoireCharacterComponent from "./ModalInterrogatoireCharacterComponent";

const ModalInterrogatoires: React.FC<ModalChildrenParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [character, setCharacter] = useState<
    (CharacterInterface & { interrogatoireId: string | number }) | null
  >(null);

  const click = useButtonHandleClick();
  const { getGameObjectFromId } = useGameObjects();

  const { getCharacterNotifyById, getCharacters, getInterrogatoires } =
    useContext(UnlockContext);

  const interrogatoires = useMemo(() => {
    return getInterrogatoires();
  }, []);

  const characters = useMemo(
    () =>
      interrogatoires.map((interrogatoire) => ({
        ...getGameObjectFromId(interrogatoire.character),
        unLock: true,
        interrogatoireId: interrogatoire.interrogatoireId.replace("@s:", ""),
      })),
    [props, character, getCharacters, getCharacterNotifyById]
  );

  return (
    <>
      <ModalComponent
        title="interrogatoires_modal_title"
        open={open}
        size="default"
        inert={!!character}
        isChildren
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {characters.map((character) => (
              <button
                key={`params-characters-character-${character._id}`}
                className={`${!character.unLock ? "inconnu" : ""} ${character.notify ? "notify" : ""}`}
                aria-hidden={!character.unLock}
                aria-describedby={character.notify ? "notify-desc" : undefined}
                onClick={(e) => {
                  if (character.unLock) {
                    click(e, {
                      callback: () => setCharacter(character),
                    });
                  }
                }}
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
                  {!character.unLock ? (
                    <TranslationComponent id="????" />
                  ) : (
                    <TranslationComponent id={character._title} />
                  )}
                </div>
                {character.notify && (
                  <span id="notify-desc" className="sr-only">
                    <TranslationComponent id="message_1759052809043" />
                  </span>
                )}
              </button>
            ))}
          </div>
        </ModalParametersCharactersContainer>
      </ModalComponent>
      <ModalInterrogatoireCharacterComponent
        onClose={() => setCharacter(null)}
        character={character}
        open={!!character}
      />
    </>
  );
};

export default ModalInterrogatoires;
