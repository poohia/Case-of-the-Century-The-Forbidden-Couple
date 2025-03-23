import { useEffect, useMemo, useState } from "react";

import { useAssets } from "../../../../../../../hooks";
import { useGameProvider } from "../../../../../../../gameProvider";

const useBar = () => {
  const { getAssetImg } = useAssets();
  const { getValueFromConstant } = useGameProvider();
  const lifeIcon = useMemo(
    () => getAssetImg(getValueFromConstant("life_icon")),
    []
  );

  const [percentDuration, setPercentDuration] = useState<number>(700);

  useEffect(() => {
    setTimeout(() => {
      setPercentDuration(1000);
    }, 900);
  });

  return {
    lifeIcon,
    percentDuration,
  };
};

export default useBar;
