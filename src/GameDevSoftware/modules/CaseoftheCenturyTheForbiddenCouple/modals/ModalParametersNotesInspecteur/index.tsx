import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick, useGameObjects } from "../../../../../hooks";
import { useMemo, useState } from "react";
import { NoteInspecteur, Scenario } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersScenariosScenarioComponent from "../ModalParametersScenarios/ModalParametersScenariosScenarioComponent";
import ModalParametersNotesNoteComponent from "./ModalParametersNotesNoteComponent";

const ModalParametersNotesInspecteur: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;
  const { getGameObjectsFromType } = useGameObjects();

  const notes = useMemo<NoteInspecteur[]>(
    () => getGameObjectsFromType("noteInspecteur"),
    []
  );

  const [note, setNote] = useState<NoteInspecteur | null>(null);

  const click = useButtonHandleClick();

  return (
    <>
      <ModalComponent
        title="label_notes_inspecteur"
        open={open}
        size="default"
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {notes.map((note, i) => (
              <div
                key={`params-scenarios-scenario-${note._id}`}
                className={i > 1 ? "inconnu" : ""}
              >
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, {
                        callback: () => setNote(note),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <ImgComponent src="scenario.png" />
                </div>
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, {
                        callback: () => setNote(note),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <h3>
                    {i > 1 ? "????" : <TranslationComponent id={note.name} />}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </ModalParametersCharactersContainer>
      </ModalComponent>
      <ModalParametersNotesNoteComponent
        onClose={() => setNote(null)}
        note={note}
        open={!!note}
      />
    </>
  );
};

export default ModalParametersNotesInspecteur;
