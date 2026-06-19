import { useCallback, useMemo } from "react";

import { useGameProvider } from "../../../../../gameProvider";

const table = "visualnovel-last-dialog";

const useLastDialog = () => {
  const { getData, saveData } = useGameProvider();

  const lastDialogId = useMemo(() => {
    return getData<number>(table) ?? null;
  }, []);

  const handleNextDialog = useCallback(
    (id: string) => {
      const finalId = Number(id.replace("@go:", ""));
      saveData(table, finalId);
    },
    [getData, saveData]
  );

  const clearLastDialog = useCallback(() => {
    saveData(table, null);
  }, [saveData]);

  return {
    lastDialogId,
    handleNextDialog,
    clearLastDialog,
  };
};

export default useLastDialog;
