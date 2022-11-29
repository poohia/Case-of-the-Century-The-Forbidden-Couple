import { useEffect, useState } from "react";

import { GameProviderHooksDefaultInterface } from "..";

export interface useApplicationInterface
  extends GameProviderHooksDefaultInterface {
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
}

const useApplication = (): useApplicationInterface => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    "radial-gradient(circle,rgba(77,79,82,1) 0%,rgba(68,70,74,1) 35%)"
  );

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
