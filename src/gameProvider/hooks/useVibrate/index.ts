import { useCallback, useEffect, useRef } from "react";

import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";

import { Platform } from "../../../types";
import { GameProviderHooksDefaultInterface } from "..";

export interface useVibrateInterface
  extends GameProviderHooksDefaultInterface, ReturnType<typeof useVibrate> {}

const useVibrate = (platform: Platform | null, activatedVibration: boolean) => {
  const phoneRingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const phoneRingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const canVibrate = useCallback(() => {
    return activatedVibration && platform !== "browser";
  }, [activatedVibration, platform]);

  const clearPhoneRingTimeouts = useCallback(() => {
    phoneRingTimeoutsRef.current.forEach((timer) => clearTimeout(timer));
    phoneRingTimeoutsRef.current = [];
  }, []);

  const stopPhoneRingLoop = useCallback(() => {
    clearPhoneRingTimeouts();
    if (phoneRingIntervalRef.current) {
      clearInterval(phoneRingIntervalRef.current);
      phoneRingIntervalRef.current = null;
    }
  }, [clearPhoneRingTimeouts]);

  const oneTap = useCallback(() => {
    if (!canVibrate()) {
      return;
    }

    Haptics.impact({ style: ImpactStyle.Medium });
  }, [canVibrate]);

  const doubleTap = useCallback(() => {
    if (!canVibrate()) {
      return;
    }
    Haptics.impact({ style: ImpactStyle.Medium });
    setTimeout(() => {
      Haptics.impact({ style: ImpactStyle.Medium });
    }, 50);
  }, [canVibrate]);

  const longTap = useCallback(() => {
    if (!canVibrate()) {
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
  }, [canVibrate]);

  const phoneRing = useCallback(() => {
    if (!canVibrate()) {
      return;
    }

    clearPhoneRingTimeouts();

    const pattern = [
      { delay: 0, duration: 120 },
      { delay: 180, duration: 120 },
      { delay: 900, duration: 120 },
      { delay: 1080, duration: 120 },
    ];

    pattern.forEach(({ delay, duration }) => {
      const timer = setTimeout(() => {
        Haptics.vibrate({ duration });
      }, delay);

      phoneRingTimeoutsRef.current.push(timer);
    });
  }, [canVibrate, clearPhoneRingTimeouts]);

  const phoneRingLoop = useCallback(() => {
    if (!canVibrate()) {
      return;
    }

    stopPhoneRingLoop();
    phoneRing();
    phoneRingIntervalRef.current = setInterval(() => {
      phoneRing();
    }, 2200);
  }, [canVibrate, phoneRing, stopPhoneRingLoop]);

  const success = useCallback(() => {
    if (!canVibrate()) {
      return;
    }
    Haptics.notification({ type: NotificationType.Success });
  }, [canVibrate]);

  const echec = useCallback(() => {
    if (!canVibrate()) {
      return;
    }
    Haptics.notification({ type: NotificationType.Error });
  }, [canVibrate]);

  useEffect(() => {
    if (canVibrate()) {
      return;
    }

    stopPhoneRingLoop();
  }, [canVibrate, stopPhoneRingLoop]);

  useEffect(() => {
    return () => {
      stopPhoneRingLoop();
    };
  }, [stopPhoneRingLoop]);

  return {
    oneTap,
    doubleTap,
    longTap,
    phoneRing,
    phoneRingLoop,
    stopPhoneRingLoop,
    success,
    echec,
  };
};

export default useVibrate;
