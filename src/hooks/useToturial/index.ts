import { useCallback, useState } from "react";
import { useGameProvider } from "../../gameProvider";

const useToturial = (id?: string | number) => {
  const { getData, saveData } = useGameProvider();
  const [show, setShow] = useState<boolean>(() => {
    return !getData<string[]>("tutorials")?.find(
      (tutorial) => tutorial === String(id)
    );
  });

  const onClose = useCallback(() => {
    if (id) {
      saveData(
        "tutorials",
        (getData<string[]>("tutorials") || [])
          .filter((i) => i !== id)
          .concat(String(id))
      );
      setShow(false);
    }
  }, [id, getData]);

  return {
    show: !id ? false : show,
    onClose,
  };
};

export default useToturial;
