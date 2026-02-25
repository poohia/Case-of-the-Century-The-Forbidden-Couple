import { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";

import { ImgComponent, TranslationComponent } from "../../../../../components";
import { NoteInspecteurInterface } from "../../../../game-types";
import ModalComponent from "../../components/ModalComponent";
import { ModalParametersScenariosScenarioComponentContainer } from "../ModalParametersScenarios/ModalParametersScenariosScenarioComponent";
import UnlockContext from "../../contexts/UnlockContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { NotesInspecteurWithImagesContainer } from "./styles";
import { ModalChildrenParametersComponentProps } from "../../../../../components/ModalComponent";

const ModalParametersNotesNoteComponent: React.FC<
  ModalChildrenParametersComponentProps & {
    note: NoteInspecteurInterface | null;
  }
> = (props) => {
  const { open, note, ...rest } = props;
  const { removeNotesInspecteurNotify } = useContext(UnlockContext);

  useEffect(() => {
    if (note && open) {
      removeNotesInspecteurNotify(note._id);
    }
  }, [open, note]);

  return (
    <ModalComponent
      open={open}
      size="default"
      title={note?.name}
      isChildren
      {...rest}
    >
      <ModalParametersScenariosScenarioComponentContainer>
        {note && (!note.images || note.images.length === 1) && (
          <div>
            <ImgComponent
              src={note.images ? note.images[0].content : "BLOC-NOTE.png"}
              forceMaxSize
              aria-hidden="true"
            />

            <section>
              {note.blocks?.map((block, i) => (
                <p key={`note-withoutimage-${note._id}-block-${i}`}>
                  <TranslationComponent id={block.content} />
                </p>
              ))}
            </section>
          </div>
        )}
        {note && note.images && note.images.length > 1 && (
          <NotesInspecteurWithImagesContainer>
            <div aria-hidden="true">
              <Swiper
                // install Swiper modules
                modules={[Pagination, A11y, Autoplay]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={true}
              >
                {note.images.map((image, i) => (
                  <SwiperSlide key={`note-image-${note._id}-${i}`}>
                    <ImgComponent src={image.content} aria-hidden="true" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <section>
              {note.blocks?.map((block, i) => (
                <p key={`note-withimage-${note._id}-block-${i}`}>
                  <TranslationComponent id={block.content} />
                </p>
              ))}
            </section>
          </NotesInspecteurWithImagesContainer>
        )}
      </ModalParametersScenariosScenarioComponentContainer>
    </ModalComponent>
  );
};

export default ModalParametersNotesNoteComponent;
