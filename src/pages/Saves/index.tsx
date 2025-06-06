import { useCallback, useMemo, useState } from "react";

import { PageComponent, TranslationComponent } from "../../components";
import { useGameProvider } from "../../gameProvider";
import { Route } from "../../types";
import {
  AllSaveContainer,
  SavesContainer,
  SavesHeader,
  SectionCreateSave,
} from "./styles";

const Saves: React.FC<{ routeBack: Route }> = ({ routeBack }) => {
  const { saves, savesPreset, push, createSave, deleteSave, loadSave } =
    useGameProvider();

  const [saveTitle, setSaveTitle] = useState<string>("");
  const [showPresetSaves, setShowPresetSaves] = useState<boolean>(false);

  const finalSaves = useMemo(
    () => (!showPresetSaves ? [...savesPreset, ...saves] : saves),
    [showPresetSaves, saves]
  );

  const handleSave = useCallback(() => {
    if (!saveTitle) {
      return;
    }
    createSave(saveTitle);
    setSaveTitle("");
  }, [saveTitle]);

  return (
    <PageComponent>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleSave();
                }}
              >
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => {
                    setSaveTitle(e.target.value);
                  }}
                />
              </form>
            </div>
            <div>
              <button onClick={handleSave}>
                <TranslationComponent id="label_saves_cta_create" />
              </button>
            </div>
          </div>
          <div>
            <label>
              &nbsp;{" "}
              <input
                type="checkbox"
                checked={showPresetSaves}
                onChange={() => setShowPresetSaves(!showPresetSaves)}
              />
              &nbsp;{" "}
              <TranslationComponent id="label_saves_checkbox_hide_preset" />
            </label>
          </div>
        </SectionCreateSave>
        <AllSaveContainer>
          {finalSaves.map((save) => (
            <div
              key={save.id}
              onClick={() => {
                loadSave(save.id);
              }}
            >
              <div>
                <h3>
                  {save.title} {save.isPreset ? "(*)" : ""}
                </h3>
                <p>{save.date}</p>
              </div>
              <div>
                {!save.isPreset && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSave(save.id);
                    }}
                  >
                    <TranslationComponent id="label_delete" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </AllSaveContainer>
      </SavesContainer>
    </PageComponent>
  );
};

export default Saves;
