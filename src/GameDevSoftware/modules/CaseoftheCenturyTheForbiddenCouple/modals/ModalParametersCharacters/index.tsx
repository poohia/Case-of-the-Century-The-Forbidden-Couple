import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick, useGameObjects } from "../../../../../hooks";
import { useMemo, useState } from "react";
import { CharacterInterface } from "../../../../game-types";
import { ImgComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "./styles";
import ModalParametersCharactersCharacterComponent from "./ModalParametersCharactersCharacterComponent";
import useUnlock from "../../hooks/useUnlock";

const ModalParametersCharacters: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [character, setCharacter] = useState<CharacterInterface | null>(null);

  const click = useButtonHandleClick();

  const { getCharacters } = useUnlock();
  const characters = useMemo(() => getCharacters(), []);

  return (
    <>
      <ModalComponent
        title="message_1749392775687"
        open={open}
        size="default"
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {characters.map((character, i) => (
              <div
                key={`params-characters-character-${character._id}`}
                className={!character.unLock ? "inconnu" : ""}
              >
                <div
                  onClick={(e) => {
                    if (character.unLock) {
                      click(e, {
                        callback: () => setCharacter(character),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <ImgComponent src={character.primaryImage} />
                </div>
                <div
                  onClick={(e) => {
                    if (character.unLock) {
                      click(e, {
                        callback: () => setCharacter(character),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <h3>{!character.unLock ? "????" : character._title}</h3>
                </div>
              </div>
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
