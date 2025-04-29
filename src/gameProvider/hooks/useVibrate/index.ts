import { useCallback } from "react";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

import { Platform } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useVibrateInterface
  extends GameProviderHooksDefaultInterface,
    ReturnType<typeof useVibrate> {}

const useVibrate = (platform: Platform | null, activatedVibration: boolean) => {
  const oneTap = useCallback(() => {
    if (!activatedVibration || platform === "browser") {
      return;
    }

    Haptics.impact({ style: ImpactStyle.Medium });
  }, [platform, activatedVibration]);

  const doubleTap = useCallback(() => {
    if (!activatedVibration || platform === "browser") {
      return;
    }
    Haptics.impact({ style: ImpactStyle.Medium });
    setTimeout(() => {
      Haptics.impact({ style: ImpactStyle.Medium });
    }, 50);
  }, [activatedVibration, platform]);

  const longTap = useCallback(() => {
    if (!activatedVibration || platform === "browser") {
      return;
    }
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
  }, [activatedVibration, platform]);

  const success = useCallback(() => {
    if (!activatedVibration || platform === "browser") {
      return;
    }
    Haptics.notification({ type: NotificationType.Success });
  }, [activatedVibration, platform]);

  const echec = useCallback(() => {
    if (!activatedVibration || platform === "browser") {
      return;
    }
    Haptics.notification({ type: NotificationType.Error });
  }, [activatedVibration, platform]);

  return {
    oneTap,
    doubleTap,
    longTap,
    success,
    echec,
  };
};

export default useVibrate;
