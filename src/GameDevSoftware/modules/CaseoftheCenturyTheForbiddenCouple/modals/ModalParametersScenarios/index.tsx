import ModalComponent from "../../components/ModalComponent";
import { ModalParametersComponentProps } from "../ModalParametersComponent";
import { useButtonHandleClick } from "../../../../../hooks";
import { useContext, useMemo, useState } from "react";
import { ScenarioInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersScenariosScenarioComponent from "./ModalParametersScenariosScenarioComponent";
import useUnlock from "../../hooks/useUnlock";
import NotifyContext from "../../contexts/NotifyContext";

const ModalParametersScenarios: React.FC<ModalParametersComponentProps> = (
  props
) => {
  const { open, ...rest } = props;

  const [scenario, setScenario] = useState<ScenarioInterface | null>(null);

  const click = useButtonHandleClick();

  const { getScenarioNotifyById } = useContext(NotifyContext);
  const { getScenarios } = useUnlock();

  const scenarios = useMemo(
    () =>
      getScenarios().map((scenario) => ({
        ...scenario,
        notify: !!getScenarioNotifyById(scenario._id)?.length,
      })),
    [props, scenario, getScenarios, getScenarioNotifyById]
  );

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
                className={`${!scenario.unLock ? "inconnu" : ""} ${scenario.notify ? "notify" : ""}`}
                aria-hidden={!scenario.unLock}
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
                  <ImgComponent
                    src="scenario.png"
                    alt={!scenario.unLock ? "message_1756477782563" : undefined}
                  />
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
