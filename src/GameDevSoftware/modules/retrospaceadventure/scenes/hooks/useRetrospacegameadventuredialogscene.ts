import { useCallback, useEffect, useRef, useState } from "react";
import { useGameProvider } from "../../../../../gameProvider";

const useRetrospacegameadventuredialogscene = () => {
  const { setBackgroundColor } = useGameProvider();
  const scannerRef = useRef<HTMLDivElement>(null);

  const [onScan, setOnScan] = useState<boolean>(true);
  const [scanIsFinish, setScanIsFinish] = useState<boolean>(false);

  const startScan = useCallback(() => {
    setOnScan(true);
  }, []);

  useEffect(() => {
    setBackgroundColor("black");
  }, [setBackgroundColor]);

  useEffect(() => {
    if (onScan && scannerRef.current) {
      const { current } = scannerRef;
      let percent = 0;
      current.style.top = `${percent}%`;
      percent += 10;
      const interval = setInterval(() => {
        if (percent >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanIsFinish(true);
          }, 1300);
        }

        current.style.top = `${percent}%`;
        percent += 10;
      }, 100);
    }
  }, [onScan]);

  return {
    onScan,
    scannerRef,
    scanIsFinish,
    startScan,
  };
};

export default useRetrospacegameadventuredialogscene;
