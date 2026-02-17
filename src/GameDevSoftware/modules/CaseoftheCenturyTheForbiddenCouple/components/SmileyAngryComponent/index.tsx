import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ImgComponent } from "../../../../../components";

import "animate.css";
import { useGameProvider } from "../../../../../gameProvider";

const CircularProgressContainer = styled.div<{
  percent: number;
  $colorText: string;
}>`
  position: absolute;
  top: calc(50% / 3);
  left: 65%;
  transform: translate(-50%, -65%);
  --circular-progress-container-width: clamp(32px, 7vh, 64px);

  width: var(--circular-progress-container-width);
  height: var(--circular-progress-container-width);
  border-radius: 50%;

  background: conic-gradient(
    ${(props) => props.$colorText} ${(props) => props.percent}%,
    #ecf0f1 ${(props) => props.percent}%
  );

  display: grid;
  place-items: center;

  &.animate__delay-2s {
    --animate-delay: 0.5s;
  }
`;

const CenteredImage = styled(ImgComponent)`
  width: 70%;
  height: auto;
  z-index: 10;
`;

type CircularProgressWithSmileyProps = {
  prevPercent?: number;
  percent: number;
};

const CircularProgressWithSmiley: React.FC<CircularProgressWithSmileyProps> = ({
  percent,
  prevPercent = 0,
}) => {
  const happyImg = useMemo(() => "SMILEY-SOURIRE.png", []);
  const mehImg = useMemo(() => "ICONES-NEUTRE-64px.png", []);
  const upsetImg = useMemo(() => "SMILEY-RONCHON.png", []);

  const [finalPercent, setFinalPercent] = useState<number>(prevPercent);
  const { getThemeValue } = useGameProvider();

  const selectedImg = useMemo(() => {
    if (finalPercent > 66) {
      return upsetImg;
    }
    if (finalPercent > 33) {
      return mehImg;
    }
    return happyImg;
  }, [finalPercent, happyImg, mehImg, upsetImg]);

  const colorPercent = useMemo(() => {
    if (finalPercent > 66) {
      return getThemeValue("colors", "danger");
    }
    if (finalPercent > 33) {
      return getThemeValue("colors", "warning");
    }
    return getThemeValue("colors", "success");
  }, [getThemeValue, finalPercent]);

  useEffect(() => {
    setFinalPercent(prevPercent);
    setTimeout(() => {
      setFinalPercent(percent);
    }, 1500);
  }, []);

  return (
    <CircularProgressContainer
      percent={finalPercent}
      $colorText={colorPercent}
      className="animate__animated animate__bounceIn animate__faster animate__delay-2s"
    >
      <CenteredImage src={selectedImg} />
    </CircularProgressContainer>
  );
};

export default CircularProgressWithSmiley;
