import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useGameObjects } from "../../../../../hooks";
import { useMemo, useState } from "react";
import { Scenario } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersScenariosScenarioComponent from "./ModalParametersScenariosScenarioComponent";
import useButtonHandleClick from "../../hooks/useButtonHandleClick";

const ModalParametersScenarios: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;
  const { getGameObjectsFromType } = useGameObjects();

  const scenarios = useMemo<Scenario[]>(
    () => getGameObjectsFromType("scenario"),
    []
  );

  const [scenario, setScenario] = useState<Scenario | null>(null);

  const click = useButtonHandleClick(true);

  return (
    <>
      <ModalComponent
        title="message_1749804726225"
        open={open}
        size="default"
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {scenarios.map((scenario, i) => (
              <div
                key={`params-scenarios-scenario-${scenario._id}`}
                className={i > 1 ? "inconnu" : ""}
              >
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, () => setScenario(scenario));
                    }
                  }}
                >
                  <ImgComponent src="scenario.png" />
                </div>
                <div
                  onClick={(e) => {
                    if (i < 2) {
                      click(e, () => setScenario(scenario));
                    }
                  }}
                >
                  <h3>
                    {i > 1 ? (
                      "????"
                    ) : (
                      <TranslationComponent id={scenario.name} />
                    )}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </ModalParametersCharactersContainer>
      </ModalComponent>
      <ModalParametersScenariosScenarioComponent
        onClose={() => setScenario(null)}
        scenario={scenario}
        open={!!scenario}
      />
    </>
  );
};

export default ModalParametersScenarios;
