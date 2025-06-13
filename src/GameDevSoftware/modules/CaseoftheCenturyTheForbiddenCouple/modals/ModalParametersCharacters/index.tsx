import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useGameObjects } from "../../../../../hooks";
import { useMemo, useState } from "react";
import { Character } from "../../../../type";
import { ImgComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "./styles";
import ModalParametersCharactersCharacterComponent from "./ModalParametersCharactersCharacterComponent";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";

const ModalParametersCharacters: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const { getGameObjectsFromType } = useGameObjects();

  const characters = useMemo<Character[]>(
    () => getGameObjectsFromType("character"),
    []
  );

  const [character, setCharacter] = useState<Character | null>(null);

  const click = useButtonHandleClick(true);

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
                className={i > 1 ? "inconnu" : ""}
              >
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, () => setCharacter(character));
                    }
                  }}
                >
                  <ImgComponent src={character.primaryImage} />
                </div>
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, () => setCharacter(character));
                    }
                  }}
                >
                  <h3>{i > 1 ? "????" : character._title}</h3>
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
