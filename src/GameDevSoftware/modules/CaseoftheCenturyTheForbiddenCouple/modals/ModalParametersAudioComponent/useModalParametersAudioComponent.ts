// useModalParametersAudioComponent.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const useModalParametersAudioComponent = (
  typeAudio: "music" | "soundEffect"
) => {
  const {
    parameters: { activatedMusic, activatedSoundsEffect },
    playSoundEffect,
    setActivatedMusic,
    setActivatedSoundsEffect,
    getValueFromConstant,
  } = useGameProvider();

  const [value, setValue] = useState(() => {
    const v =
      typeAudio === "music"
        ? activatedMusic * 100
        : activatedSoundsEffect * 100;
    if (isNaN(v) || v < 0) {
      return 0;
    }
    if (v > 100) {
      return 100;
    }
    return v;
  });

  useEffect(() => {
    setValue(() => {
      const v =
        typeAudio === "music"
          ? activatedMusic * 100
          : activatedSoundsEffect * 100;
      if (isNaN(v) || v < 0) {
        return 0;
      }
      if (v > 100) {
        return 100;
      }
      return v;
    });
  }, [activatedMusic, activatedSoundsEffect]);

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // Convertit une position clientY en valeur [0..100]
  const positionToValue = useCallback(
    (clientY: number) => {
      const trackEl = trackRef.current;
      if (!trackEl) {
        return value;
      }
      const rect = trackEl.getBoundingClientRect();
      let relativeY = clientY - rect.top;
      if (relativeY < 0) {
        relativeY = 0;
      }
      if (relativeY > rect.height) {
        relativeY = rect.height;
      }
      const fromBottom = rect.height - relativeY;
      const newValue = Math.round((fromBottom / rect.height) * 100);
      return newValue;
    },
    [value]
  );

  // Met à jour la valeur et notifie le provider
  const setValueAndNotify = useCallback(
    (newValue: number) => {
      const vClamped = Math.max(0, Math.min(100, newValue));
      setValue(vClamped);
      if (typeAudio === "music") {
        setActivatedMusic(vClamped / 100);
      } else {
        setActivatedSoundsEffect(vClamped / 100);
      }
    },
    [typeAudio, setActivatedMusic, setActivatedSoundsEffect]
  );

  // --------------------------------------------------
  // GESTION SOURIS
  // --------------------------------------------------

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    draggingRef.current = true;
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current) {
        return;
      }
      const newVal = positionToValue(e.clientY);
      setValueAndNotify(newVal);
    },
    [positionToValue, setValueAndNotify]
  );

  const handleMouseUp = () => {
    if (draggingRef.current) {
      playSoundEffect({
        sound: "button_click.mp3",
        volume: getValueFromConstant("button_click_volume"),
      });
      draggingRef.current = false;
      document.body.style.userSelect = "";
    }
  };

  const handleTrackClick = (clientY: number) => {
    const newVal = positionToValue(clientY);
    playSoundEffect({
      sound: "button_click.mp3",
      volume: getValueFromConstant("button_click_volume"),
      ratio: newVal / 100,
    });
    setValueAndNotify(newVal);
  };

  // --------------------------------------------------
  // GESTION TOUCH
  // --------------------------------------------------

  const handleThumbTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    draggingRef.current = true;
    document.body.style.userSelect = "none";
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!draggingRef.current) {
        return;
      }
      // On prend le premier point touch
      const touch = e.touches[0];
      if (touch) {
        const newVal = positionToValue(touch.clientY);
        setValueAndNotify(newVal);
      }
    },
    [positionToValue, setValueAndNotify]
  );

  const handleTouchEnd = () => {
    if (draggingRef.current) {
      playSoundEffect({
        sound: "button_click.mp3",
        volume: getValueFromConstant("button_click_volume"),
      });
      draggingRef.current = false;
      document.body.style.userSelect = "";
    }
  };

  const handleTrackTouchStart = (e: React.TouchEvent) => {
    // Premier point touch
    const touch = e.touches[0];
    if (touch) {
      handleTrackClick(touch.clientY);
    }
  };

  // --------------------------------------------------
  // ABONNEMENTS AUX ÉVÉNEMENTS GLOBAUX
  // --------------------------------------------------

  useEffect(() => {
    // Souris
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    // Touch
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleTouchMove]);

  return {
    value,
    trackRef,
    handleTrackClick: (e: React.MouseEvent) => handleTrackClick(e.clientY),
    handleThumbMouseDown,
    handleTrackTouchStart,
    handleThumbTouchStart,
  };
};

export default useModalParametersAudioComponent;
