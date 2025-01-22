import { useCallback, useEffect, useState } from "react";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

import { useGameProvider } from "../../gameProvider";

const useVibrate = () => {
  const {
    platform,
    parameters: { activatedVibration },
  } = useGameProvider();
  const [_canVibrate, setCanVibrate] = useState<boolean>(activatedVibration);

  const oneTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate || platform === "browser") return canVibrate;

      Haptics.impact({ style: ImpactStyle.Medium });
      return canVibrate;
    });
  }, [platform]);

  const doubleTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate || platform === "browser") return canVibrate;

      Haptics.impact({ style: ImpactStyle.Medium });
      setTimeout(() => {
        Haptics.impact({ style: ImpactStyle.Medium });
      }, 50);
      return canVibrate;
    });
  }, [platform]);

  const longTap = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate || platform === "browser") return canVibrate;

      Haptics.impact({ style: ImpactStyle.Medium });
      setTimeout(() => {
        Haptics.impact({ style: ImpactStyle.Medium });
      }, 50);
      setTimeout(() => {
        Haptics.impact({ style: ImpactStyle.Medium });
      }, 50 * 2);
      setTimeout(() => {
        Haptics.impact({ style: ImpactStyle.Medium });
      }, 50 * 3);
      setTimeout(() => {
        Haptics.impact({ style: ImpactStyle.Medium });
      }, 50 * 4);

      return canVibrate;
    });
  }, [platform]);

  const success = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate || platform === "browser") return canVibrate;

      Haptics.notification({ type: NotificationType.Success });
      return canVibrate;
    });
  }, [platform]);

  const echec = useCallback(() => {
    setCanVibrate((canVibrate) => {
      if (!canVibrate || platform === "browser") return canVibrate;

      Haptics.notification({ type: NotificationType.Error });
      return canVibrate;
    });
  }, [platform]);

  useEffect(() => {
    setCanVibrate(activatedVibration);
  }, [activatedVibration]);

  return {
    oneTap,
    doubleTap,
    longTap,
    success,
    echec,
  };
};

export default useVibrate;
