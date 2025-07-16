import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useStateWithPrevious } from "../../../../../hooks";

const usePercentAngry = () => {
  const { getEnvVar, saveData, getData } = useGameProvider();
  const TABLE_PERCENT_ANGRY = "percent_angry";

  const [percentAngry, previousPercentAngry, setPercentAngry] =
    useStateWithPrevious(getData<number>(TABLE_PERCENT_ANGRY) || 0);
  const showEnd = useMemo(() => {
    if (percentAngry >= 100) {
      return true;
    }
    return false;
  }, [percentAngry]);

  const disableSaveLastDialogue = useMemo(
    () => getEnvVar<boolean>("DISABLE_SAVE_DIALOGUE"),
    []
  );

  const addPercent = useCallback(
    (percentAngry: number) => {
      setPercentAngry((_p) => {
        const pe = _p + (percentAngry || 2);
        if (!disableSaveLastDialogue) {
          saveData(TABLE_PERCENT_ANGRY, pe);
        }
        return pe;
      });
    },
    [disableSaveLastDialogue]
  );

  useEffect(() => {
    setPercentAngry(getData(TABLE_PERCENT_ANGRY) || 0);
  }, []);

  return {
    percentAngry,
    previousPercentAngry,
    showEnd,
    addPercent,
  };
};

export default usePercentAngry;
