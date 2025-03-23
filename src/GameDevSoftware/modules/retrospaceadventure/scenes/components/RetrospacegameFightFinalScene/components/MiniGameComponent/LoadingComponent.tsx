import { useEffect, useMemo, useState } from "react";
import TextHackedEffectComponent from "react-text-hacked";
import MatrixCodeRainComponent from "react-matrix-code-rain";

import { useGameProvider } from "../../../../../../../../gameProvider";
import { randomFromArray } from "../../../../utils";
import { LoadingComponentContainer } from "./styles";
import ProgressBar from "../../../styled/ProgressBar";

type LoadingComponentProps = {
  onFinish: () => void;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState<number>(0);
  const { translateText, playSound } = useGameProvider();

  const style = useMemo(
    () => randomFromArray<"hack" | "matrix">(["hack", "matrix"]),
    []
  );

  const loadingString = useMemo(
    () => translateText("label_loading"),
    [translateText]
  );
  const loadingStringSplit = useMemo(
    () => loadingString.split(""),
    [loadingString]
  );

  useEffect(() => {
    if (style === "hack") {
      setTimeout(() => {
        const timeOut = setInterval(
          () =>
            setProgress((_progress) => {
              if (_progress >= 100) {
                clearInterval(timeOut);
                return 100;
              }
              if (_progress > 30) {
                return _progress + 10;
              }
              if (_progress > 60) {
                return _progress + 20;
              }
              if (_progress < 100) {
                return _progress + 5;
              }
              return 100;
            }),
          70
        );
      }, 500);
    } else {
      setTimeout(() => {
        setProgress(100);
      }, 2000);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (style === "matrix") {
        setTimeout(() => {
          playSound(
            "573189__inspectorj__computer-glitching-digital-data-corruption-02-04-loop.mp3",
            0
          );
        }, 500);
      } else {
        playSound("mixkit-glitch-communication-sound-1034.mp3", 0);
      }
    }, 500);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onFinish, 1000);
    }
  }, [progress]);

  return (
    <LoadingComponentContainer>
      {style === "matrix" ? (
        <MatrixCodeRainComponent textStrip={loadingStringSplit} />
      ) : (
        <div>
          <div>
            {progress > 0 && (
              <h1>
                <TextHackedEffectComponent
                  defaultText={loadingString}
                  timeOut={40}
                  startAfterTimer={100}
                />
              </h1>
            )}
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}
    </LoadingComponentContainer>
  );
};

export default LoadingComponent;
