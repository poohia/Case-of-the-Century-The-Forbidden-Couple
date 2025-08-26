import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import { useMemo, useState } from "react";
import { ScenarioInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersScenariosScenarioComponent from "./ModalParametersScenariosScenarioComponent";
import useUnlock from "../../hooks/useUnlock";

const ModalParametersScenarios: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [scenario, setScenario] = useState<ScenarioInterface | null>(null);

  const click = useButtonHandleClick();

  const { getScenarios } = useUnlock();
  const scenarios = useMemo(() => getScenarios(), []);

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
            {scenarios.map((scenario) => (
              <div
                key={`params-scenarios-scenario-${scenario._id}`}
                className={!scenario.unLock ? "inconnu" : ""}
              >
                <div
                  onClick={(e) => {
                    if (scenario.unLock) {
                      click(e, {
                        callback: () => setScenario(scenario),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <ImgComponent src="scenario.png" />
                </div>
                <div
                  onClick={(e) => {
                    if (scenario.unLock) {
                      click(e, {
                        callback: () => setScenario(scenario),
                        playSound: true,
                      });
                    }
                  }}
                >
                  <h3>
                    {!scenario.unLock ? (
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
