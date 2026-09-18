import { useCallback, useContext, useMemo } from "react";

import { ButtonClassicGroupComponent } from "../../../../../components";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import UnlockContext from "../../contexts/UnlockContext";
import { CulpritSelectionValue } from ".";
import { useGameProvider } from "../../../../../gameProvider";

const ModalCulpritSelectionCulpritSelection: React.FC<
  ModalChildrenParametersComponentProps & {
    value: CulpritSelectionValue;
    onCharacterSelected: (characterId: number) => void;
  }
> = (props) => {
  const { open, value, onCharacterSelected, ...rest } = props;

  const { getCharacters } = useContext(UnlockContext);
  const { getValueFromConstant } = useGameProvider();

  const victimeId = useMemo(() => getValueFromConstant("victime_id"), []);

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
      ...characters
        .slice(1)
        .filter(
          (c) =>
            c._id !== value.culpritId1 &&
            c._id !== value.culpritId2 &&
            c._id !== victimeId
        )
        .map((character) => ({
          key: `${character._id}`,
          idText: character._title,
          animate: true,
        })),
    ],
    [characters, value]
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
