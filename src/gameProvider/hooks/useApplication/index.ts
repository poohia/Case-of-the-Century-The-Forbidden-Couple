import { useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
}

const useApplication = (): useApplicationInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("blue");

  useEffect(() => {
    setLoaded(true);
  }, []);

  return {
    backgroundColor,
    loaded,
    setBackgroundColor,
  };
};

export default useApplication;
