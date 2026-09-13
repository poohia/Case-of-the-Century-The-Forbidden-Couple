import { useCallback, useContext, useMemo } from "react";

import { ButtonClassicGroupComponent } from "../../../../../components";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import UnlockContext from "../../contexts/UnlockContext";

const ModalCulpritSelectionCulpritSelection: React.FC<
  ModalChildrenParametersComponentProps & {
    onCharacterSelected: (characterId: number) => void;
  }
> = (props) => {
  const { open, onCharacterSelected, ...rest } = props;

  const { getCharacters } = useContext(UnlockContext);

  const characters = useMemo(
    () => getCharacters().filter((character) => character.unLock),
    [getCharacters]
  );
  const buttonsAction = useMemo<ButtonClassicType[]>(
    () => [
      {
        key: "0",
        idText: "message_1789302355219",
        animate: true,
      },
      ...characters.slice(1).map((character) => ({
        key: `${character._id}`,
        idText: character._title,
        animate: true,
      })),
    ],
    [characters]
  );
  const handleClickButtonsAction = useCallback(
    (key: string) => {
      const characterId = Number(key);

      onCharacterSelected(characterId);
    },
    [onCharacterSelected]
  );

  return (
    <ModalComponent
      title="message_1789301650227"
      open={open}
      size="small"
      {...rest}
    >
      <div>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={handleClickButtonsAction}
        />
      </div>
    </ModalComponent>
  );
};

export default ModalCulpritSelectionCulpritSelection;
