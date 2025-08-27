import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import { useContext, useMemo, useState } from "react";
import { NoteInspecteurInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersNotesNoteComponent from "./ModalParametersNotesNoteComponent";
import useUnlock from "../../hooks/useUnlock";
import NotifyContext from "../../contexts/NotifyContext";

const ModalParametersNotesInspecteur: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [note, setNote] = useState<NoteInspecteurInterface | null>(null);

  const click = useButtonHandleClick();

  const { getNotesInspecteurNotifyById } = useContext(NotifyContext);
  const { getNotesInspecteur } = useUnlock();

  const notes = useMemo(
    () =>
      getNotesInspecteur().map((noteInspecteur) => ({
        ...noteInspecteur,
        notify: !!getNotesInspecteurNotifyById(noteInspecteur._id)?.length,
      })),
    [props, note, getNotesInspecteur, getNotesInspecteurNotifyById]
  );

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
            {notes.map((note) => (
              <div
                key={`params-scenarios-scenario-${note._id}`}
                className={`${!note.unLock ? "inconnu" : ""} ${note.notify ? "notify" : ""}`}
              >
                <div
                  onClick={(e) => {
                    if (note.unLock) {
                      click(e, {
                        callback: () => setNote(note),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <ImgComponent src="BLOC-NOTE.png" />
                </div>
                <div
                  onClick={(e) => {
                    if (note.unLock) {
                      click(e, {
                        callback: () => setNote(note),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <h3>
                    {!note.unLock ? (
                      "????"
                    ) : (
                      <TranslationComponent id={note.name} />
                    )}
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
