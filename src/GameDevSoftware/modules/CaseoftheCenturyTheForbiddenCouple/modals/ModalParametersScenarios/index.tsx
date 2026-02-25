import { useContext, useMemo, useState } from "react";

import { useButtonHandleClick } from "../../../../../hooks";
import { ScenarioInterface } from "../../../../game-types";
import { ImgComponent, TranslationComponent } from "../../../../../components";
import { ModalParametersCharactersContainer } from "../ModalParametersCharacters/styles";
import ModalParametersScenariosScenarioComponent from "./ModalParametersScenariosScenarioComponent";
import UnlockContext from "../../contexts/UnlockContext";
import { useGameProvider } from "../../../../../gameProvider";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";

const ModalParametersScenarios: React.FC<
  ModalChildrenParametersComponentProps
> = (props) => {
  const { open, ...rest } = props;

  const [scenario, setScenario] = useState<ScenarioInterface | null>(null);

  const click = useButtonHandleClick();
  const { getEnvVar } = useGameProvider();

  const { getScenarioNotifyById, getScenarios } = useContext(UnlockContext);

  const scenarios = useMemo(
    () =>
      getScenarios()
        .sort((a, b) => {
          return (a.order ?? 0) - (b.order ?? 0);
        })
        .map((scenario) => ({
          ...scenario,
          notify: !!getScenarioNotifyById(scenario._id)?.length,
        })),
    [props, scenario, getScenarios, getScenarioNotifyById]
  );

  const forceShowScenarios = useMemo(
    () => getEnvVar("UNLOCK_ALL_SCENARIOS") === true,
    []
  );

  return (
    <>
      <ModalComponent
        title="message_1749804726225"
        open={open}
        size="default"
        inert={!!scenario}
        isChildren
        {...rest}
      >
        <ModalParametersCharactersContainer>
          <div>
            {scenarios.map((scenario, i) => (
              <section
                key={`params-scenarios-scenario-${scenario._id}`}
                className={`${!scenario.unLock && !forceShowScenarios ? "inconnu" : ""} ${scenario.notify ? "notify" : ""}`}
                aria-hidden={!scenario.unLock}
                aria-describedby={scenario.notify ? "notify-desc" : undefined}
                onClick={(e) => {
                  if (scenario.unLock || forceShowScenarios) {
                    click(e, {
                      callback: () => setScenario(scenario),
                      playSound: true,
                    });
                  }
                }}
                role="button"
                tabIndex={i}
              >
                <div aria-hidden="true">
                  <ImgComponent
                    src="scenario.png"
                    alt={!scenario.unLock ? "message_1756477782563" : undefined}
                  />
                </div>
                <div>
                  <h3>
                    {!scenario.unLock && !forceShowScenarios ? (
                      "????"
                    ) : (
                      <TranslationComponent id={scenario.name} />
                    )}
                  </h3>
                </div>
                {scenario.notify && (
                  <span id="notify-desc" className="sr-only">
                    <TranslationComponent id="message_1759052809043" />
                  </span>
                )}
              </section>
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
