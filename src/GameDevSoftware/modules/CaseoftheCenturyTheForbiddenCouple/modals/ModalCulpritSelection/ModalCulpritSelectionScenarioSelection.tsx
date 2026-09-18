import { useCallback, useMemo } from "react";

import { ButtonClassicGroupComponent } from "../../../../../components";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { useGameObjects } from "../../../../../hooks";
import { ScenarioInterface } from "../../../../game-types";
import { CulpritSelectionValue } from ".";

const getGameObjectId = (reference: string) =>
  Number(reference.replace("@go:", ""));

type ScenarioPriority = {
  missingMotifs: number;
  extraMotifs: number;
  order: number;
};

const ModalCulpritSelectionScenarioSelection: React.FC<
  ModalChildrenParametersComponentProps & {
    value: CulpritSelectionValue;
    onScenarioSelected: (scenarioId: number) => void;
  }
> = (props) => {
  const { open, value, onScenarioSelected, ...rest } = props;
  const { getGameObjectsFromType } = useGameObjects();

  const scenarios = useMemo(
    () => getGameObjectsFromType("scenario") as ScenarioInterface[],
    [getGameObjectsFromType]
  );
  const selectedCharacterIds = useMemo(
    () =>
      [value.culpritId1, value.culpritId2].filter(
        (id): id is number => typeof id === "number" && id !== 0
      ),
    [value.culpritId1, value.culpritId2]
  );
  const selectedMotifIds = useMemo(
    () =>
      [value.mobileId1, value.mobileId2].filter(
        (id): id is number => typeof id === "number" && id !== 0
      ),
    [value.mobileId1, value.mobileId2]
  );
  const buttonsAction = useMemo<ButtonClassicType[]>(
    () =>
      scenarios
        .filter((scenario) =>
          selectedCharacterIds.every((characterId) =>
            (scenario.personnages ?? []).some(
              ({ character }) => getGameObjectId(character) === characterId
            )
          )
        )
        .map((scenario) => {
          const scenarioMotifIds = scenario.mobiles.map(({ mobile }) =>
            getGameObjectId(mobile)
          );
          const priority: ScenarioPriority = {
            missingMotifs: selectedMotifIds.filter(
              (motifId) => !scenarioMotifIds.includes(motifId)
            ).length,
            extraMotifs:
              selectedMotifIds.length === 0
                ? 0
                : scenarioMotifIds.filter(
                    (motifId) => !selectedMotifIds.includes(motifId)
                  ).length,
            order: scenario.order ?? Number.MAX_SAFE_INTEGER,
          };

          return { scenario, priority };
        })
        .sort(
          (
            { scenario: a, priority: aPriority },
            { scenario: b, priority: bPriority }
          ) =>
            aPriority.missingMotifs - bPriority.missingMotifs ||
            aPriority.extraMotifs - bPriority.extraMotifs ||
            aPriority.order - bPriority.order ||
            a._id - b._id
        )
        .map(({ scenario }) => ({
          key: `${scenario._id}`,
          idText: scenario.name,
          animate: true,
        })),
    [scenarios, selectedCharacterIds, selectedMotifIds]
  );
  const handleClickButtonsAction = useCallback(
    (key: string) => {
      onScenarioSelected(Number(key));
    },
    [onScenarioSelected]
  );

  return (
    <ModalComponent
      title="message_1789481721253"
      open={open}
      size="small"
      {...rest}
    >
      <div>
        <ButtonClassicGroupComponent
          buttons={buttonsAction}
          show={open}
          onClick={handleClickButtonsAction}
        />
      </div>
    </ModalComponent>
  );
};

export default ModalCulpritSelectionScenarioSelection;
