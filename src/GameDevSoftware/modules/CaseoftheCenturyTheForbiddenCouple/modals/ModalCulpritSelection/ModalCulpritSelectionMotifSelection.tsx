import { useCallback, useMemo } from "react";

import { ButtonClassicGroupComponent } from "../../../../../components";
import { ButtonClassicType } from "../../../../../components/ButtonClassicComponent";
import ModalComponent, {
  ModalChildrenParametersComponentProps,
} from "../../../../../components/ModalComponent";
import { useGameObjects } from "../../../../../hooks";
import { MobileInterface, ScenarioInterface } from "../../../../game-types";
import { CulpritSelectionValue } from ".";
import { useGameProvider } from "../../../../../gameProvider";

const getGameObjectId = (reference: string) =>
  Number(reference.replace("@go:", ""));

type ScenarioPriority = {
  extraCharacters: number;
  extraMotifs: number;
  order: number;
};

const hasHigherPriority = (
  candidate: ScenarioPriority,
  current: ScenarioPriority
) => {
  if (candidate.extraCharacters !== current.extraCharacters) {
    return candidate.extraCharacters < current.extraCharacters;
  }
  if (candidate.extraMotifs !== current.extraMotifs) {
    return candidate.extraMotifs < current.extraMotifs;
  }
  return candidate.order < current.order;
};

const ModalCulpritSelectionMotifSelection: React.FC<
  ModalChildrenParametersComponentProps & {
    value: CulpritSelectionValue;
    onMotifSelected: (motifId: number) => void;
  }
> = (props) => {
  const { open, value, onMotifSelected, ...rest } = props;

  const { getGameObjectsFromType } = useGameObjects();
  const { getValueFromConstant } = useGameProvider();

  const pulsionMeurtriereMobileId = useMemo(() => {
    return getValueFromConstant("pulsionmeurtriere_mobile_id");
  }, [getValueFromConstant]);

  const scenarios = useMemo(
    () => getGameObjectsFromType("scenario") as ScenarioInterface[],
    [getGameObjectsFromType]
  );
  const motifs = useMemo(
    () => getGameObjectsFromType("mobile") as MobileInterface[],
    [getGameObjectsFromType]
  );
  const scenarioPriorityByMotifId = useMemo(() => {
    const selectedCharacterIds = [value.culpritId1, value.culpritId2].filter(
      (id): id is number => typeof id === "number" && id !== 0
    );
    const selectedMotifIds = [value.mobileId1, value.mobileId2].filter(
      (id): id is number => typeof id === "number" && id !== 0
    );
    const priorities = new Map<number, ScenarioPriority>();

    scenarios.forEach((scenario) => {
      const hasSelectedCharacters = selectedCharacterIds.every((characterId) =>
        (scenario.personnages ?? []).some(
          ({ character }) => getGameObjectId(character) === characterId
        )
      );
      const hasSelectedMotifs = selectedMotifIds.every((motifId) =>
        scenario.mobiles.some(
          ({ mobile }) => getGameObjectId(mobile) === motifId
        )
      );

      if (!hasSelectedCharacters || !hasSelectedMotifs) {
        return;
      }

      const scenarioCharacterIds = (scenario.personnages ?? []).map(
        ({ character }) => getGameObjectId(character)
      );
      const scenarioMotifIds = scenario.mobiles.map(({ mobile }) =>
        getGameObjectId(mobile)
      );
      const extraCharacters = scenarioCharacterIds.filter(
        (characterId) => !selectedCharacterIds.includes(characterId)
      ).length;

      scenarioMotifIds.forEach((motifId) => {
        const extraMotifs = scenarioMotifIds.filter(
          (scenarioMotifId) =>
            scenarioMotifId !== motifId &&
            !selectedMotifIds.includes(scenarioMotifId)
        ).length;
        const priority: ScenarioPriority = {
          extraCharacters,
          extraMotifs,
          order: scenario.order ?? Number.MAX_SAFE_INTEGER,
        };
        const currentPriority = priorities.get(motifId);

        if (
          currentPriority === undefined ||
          hasHigherPriority(priority, currentPriority)
        ) {
          priorities.set(motifId, priority);
        }
      });
    });

    return priorities;
  }, [scenarios, value]);
  const buttonsAction = useMemo<ButtonClassicType[]>(
    () =>
      motifs
        .filter(
          (motif) =>
            motif._id !== value.mobileId1 &&
            (value.mobileId2 === 0 || motif._id !== value.mobileId2)
        )
        .sort((a, b) => {
          const aPriority = scenarioPriorityByMotifId.get(a._id);
          const bPriority = scenarioPriorityByMotifId.get(b._id);
          const aIsFound = aPriority !== undefined;
          const bIsFound = bPriority !== undefined;

          // La pulsion meurtrière reste parmi les motifs trouvés, mais ferme
          // toujours cette liste avant les motifs qui ne correspondent à aucun scénario.
          if (aIsFound && bIsFound) {
            if (a._id === pulsionMeurtriereMobileId) {
              return 1;
            }
            if (b._id === pulsionMeurtriereMobileId) {
              return -1;
            }
          }

          if (aPriority && bPriority) {
            return (
              aPriority.extraCharacters - bPriority.extraCharacters ||
              aPriority.extraMotifs - bPriority.extraMotifs ||
              aPriority.order - bPriority.order ||
              a._id - b._id
            );
          }
          if (aPriority) {
            return -1;
          }
          if (bPriority) {
            return 1;
          }

          return a._id - b._id;
        })
        .map((motif) => ({
          key: `${motif._id}`,
          idText: motif._title,
          animate: true,
        })),
    [
      motifs,
      pulsionMeurtriereMobileId,
      scenarioPriorityByMotifId,
      value.mobileId1,
      value.mobileId2,
    ]
  );
  const handleClickButtonsAction = useCallback(
    (key: string) => {
      const motifId = Number(key);

      onMotifSelected(motifId);
    },
    [onMotifSelected]
  );

  return (
    <ModalComponent
      title="message_1789459899937"
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

export default ModalCulpritSelectionMotifSelection;
