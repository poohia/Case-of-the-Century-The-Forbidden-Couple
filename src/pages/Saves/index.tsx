import { PageComponent, TranslationComponent } from "../../components";
import { useGameProvider } from "../../gameProvider";
import { Route } from "../../types";
import { SavesContainer, SavesHeader, SectionCreateSave } from "./styles";

const Saves: React.FC<{ routeBack: Route }> = ({ routeBack }) => {
  const { push, createSave, getSaves, loadSave } = useGameProvider();

  return (
    <PageComponent forceContainerCenter>
      <SavesContainer>
        <SavesHeader>
          <div>
            <h1>
              <TranslationComponent id="label_saves" />
            </h1>
          </div>
          <div>
            <button type="button" onClick={() => push(routeBack || "home")}>
              <TranslationComponent id="parameters_back" />
            </button>
          </div>
        </SavesHeader>
        <SectionCreateSave>
          <div>
            <label>
              <TranslationComponent id="label_saves_create_title" />
            </label>
          </div>
          <div>
            <div>
              <input type="text" />
            </div>
            <div>
              <button>
                <TranslationComponent id="label_saves_cta_create" />
              </button>
            </div>
          </div>
        </SectionCreateSave>
      </SavesContainer>
    </PageComponent>
  );
};

export default Saves;
