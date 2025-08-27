import { useContext, useEffect } from "react";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { NoteInspecteurInterface } from "../../../../game-types";
import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { ModalParametersScenariosScenarioComponentContainer } from "../ModalParametersScenarios/ModalParametersScenariosScenarioComponent";
import NotifyContext from "../../contexts/NotifyContext";

const ModalParametersNotesNoteComponent: React.FC<
  ModalParametersComponentProps & { note: NoteInspecteurInterface | null }
> = (props) => {
  const { open, note, ...rest } = props;
  const { removeNotesInspecteurNotify } = useContext(NotifyContext);

  useEffect(() => {
    if (note) {
      removeNotesInspecteurNotify(note._id);
    }
  }, [note]);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={note?.name}
      isChildren
      {...rest}
    >
      <ModalParametersScenariosScenarioComponentContainer>
        {note && (
          <div>
            <ImgComponent src="BLOC-NOTE.png" forceMaxSize />

            <div>
              {note.blocks?.map((block, i) => (
                <p key={`note-${note._id}-block-${i}`}>
                  <TranslationComponent id={block.content} />
                </p>
              ))}
            </div>
          </div>
        )}
      </ModalParametersScenariosScenarioComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersNotesNoteComponent;
