import { useMemo } from "react";
import c from "../../../config.json";
import { ConfigApplication } from "../../../types";
import { useEnvInterface } from "../useEnv";

import christmasTree from "./christmas-tree.png";
import { GameProviderHooksDefaultInterface } from "..";
import { HolidaysOverlaysContainer } from "./styled";

const config = c as ConfigApplication;

export interface useHolidaysOverlayInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useHolidaysOverlay> {}

const useHolidaysOverlay = (getEnvVar: useEnvInterface["getEnvVar"]) => {
  const month = useMemo(() => new Date().getMonth(), []);
  const showChristmas = useMemo<boolean>(
    () =>
      (!!config.holidaysOverlay?.christmas && month === 11) ||
      !!getEnvVar("FORCE_CHIRSTMAS_OVLERAY"),
    [month]
  );
  const showHalloween = useMemo<boolean>(
    () =>
      (!!config.holidaysOverlay?.halloween && month === 9) ||
      !!getEnvVar("FORCE_HALLOWEEN_OVERLAY"),
    [month]
  );

  const HolidaysOverlayComponent: React.FC = () => {
    if (!showChristmas && !showHalloween) {
      return <></>;
    }

    return (
      <HolidaysOverlaysContainer>
        {showChristmas && (
          <>
            <div className="snow-overlay"></div>
            <div className="snow-overlay"></div>
            <div className="holiday-icon">
              <img src={christmasTree} />
            </div>
          </>
        )}
      </HolidaysOverlaysContainer>
    );
  };

  return { showChristmas, showHalloween, HolidaysOverlayComponent };
};

export default useHolidaysOverlay;
