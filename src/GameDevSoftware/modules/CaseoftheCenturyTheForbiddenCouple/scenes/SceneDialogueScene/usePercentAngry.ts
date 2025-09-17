import { useCallback, useEffect, useMemo, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";
import { useStateWithPrevious } from "../../../../../hooks";

const usePercentAngry = () => {
  const { getEnvVar, saveData, getData } = useGameProvider();
  const DISABLE_SAVE_DIALOGUE = useMemo(
    () => getEnvVar<boolean>("DISABLE_SAVE_DIALOGUE"),
    []
  );
  const DISABLE_ADD_PERCENT = useMemo(
    () => getEnvVar<boolean>("DISABLE_ADD_PERCENT"),
    []
  );
  const TABLE_PERCENT_ANGRY = "percent_angry";

  const [percentAngry, previousPercentAngry, setPercentAngry] =
    useStateWithPrevious(
      DISABLE_SAVE_DIALOGUE ? 0 : getData<number>(TABLE_PERCENT_ANGRY) || 0
    );
  const showEnd = useMemo(() => {
    if (percentAngry >= 100) {
      return true;
    }
    return false;
  }, [percentAngry]);

  const addPercent = useCallback(
    (percentAngry: number) => {
      if (DISABLE_ADD_PERCENT) {
        return;
      }
      setPercentAngry((_p) => {
        const pe = _p + (percentAngry || 2);
        // const pe = _p + 99;
        if (!DISABLE_SAVE_DIALOGUE) {
          saveData(TABLE_PERCENT_ANGRY, pe);
        }
        return pe;
      });
    },
    [DISABLE_SAVE_DIALOGUE, DISABLE_ADD_PERCENT]
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
