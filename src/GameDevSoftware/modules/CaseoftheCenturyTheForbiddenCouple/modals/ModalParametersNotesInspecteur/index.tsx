import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import { useContext, useMemo, useState } from "react";
import { NoteInspecteurInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersNotesNoteComponent from "./ModalParametersNotesNoteComponent";
import UnlockContext from "../../contexts/UnlockContext";
import { useGameProvider } from "../../../../../gameProvider";

const ModalParametersNotesInspecteur: React.FC<
  ModalParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [note, setNote] = useState<NoteInspecteurInterface | null>(null);

  const click = useButtonHandleClick();

  const { getNotesInspecteurNotifyById, getNotesInspecteur } =
    useContext(UnlockContext);
  const { getEnvVar } = useGameProvider();

  const forceShowNotes = useMemo(
    () => getEnvVar("UNLOCK_ALL_NOTES") === true,
    []
  );

  const notes = useMemo(
    () =>
      getNotesInspecteur()
        .sort((a, b) => {
          return (a.order ?? 0) - (b.order ?? 0);
        })
        .map((noteInspecteur) => ({
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
            {notes.map((note, i) => (
              <section
                key={`params-scenarios-scenario-${note._id}`}
                className={`${!note.unLock && !forceShowNotes ? "inconnu" : ""} ${note.notify ? "notify" : ""}`}
                aria-hidden={!note.unLock}
                aria-describedby={note.notify ? "notify-desc" : undefined}
                onClick={(e) => {
                  if (note.unLock || forceShowNotes) {
                    click(e, {
                      callback: () => setNote(note),
                      playSound: true,
                    });
                  }
                }}
                role="button"
                tabIndex={i}
              >
                <div aria-hidden="true">
                  <ImgComponent
                    src="BLOC-NOTE.png"
                    alt={
                      !note.unLock && !forceShowNotes
                        ? "message_1756477782563"
                        : undefined
                    }
                  />
                </div>
                <div>
                  <h3>
                    {!note.unLock && !forceShowNotes ? (
                      "????"
                    ) : (
                      <TranslationComponent id={note.name} />
                    )}
                  </h3>
                </div>
                {note.notify && (
                  <span id="notify-desc" className="sr-only">
                    <TranslationComponent id="message_1759052809043" />
                  </span>
                )}
              </section>
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
