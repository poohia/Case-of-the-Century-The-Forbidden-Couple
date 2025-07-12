import { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import "animate.css";
import { useGameProvider } from "../../../../../gameProvider";

function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const PointsGameComponentContainer = styled.div`
  position: absolute;
  top: clamp(15px, var(--sat), var(--sat));
  left: clamp(15px, var(--sal), var(--sal));
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.2rem;
  font-weight: 550;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
`;

const PointsGameComponent: React.FC<{ points: number }> = ({ points }) => {
  const { translateText } = useGameProvider();
  const textPoints = useMemo(() => translateText("label_points"), []);
  const [displayValue, setDisplayValue] = useState<string>(
    `&nbsp;${points} ${textPoints}`
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const oldPoints = usePrevious(points);

  useEffect(() => {
    if (typeof oldPoints === "undefined" || oldPoints === points) {
      return;
    }

    const difference = points - oldPoints;

    if (difference > 0) {
      setDisplayValue(`+${difference} ${textPoints}`);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setDisplayValue(`&nbsp;${points} ${textPoints}`);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDisplayValue(`&nbsp;${points} ${textPoints}`);
    }
  }, [points]);

  const animationClasses = isAnimating
    ? "animate__animated animate__pulse"
    : "";

  return (
    <PointsGameComponentContainer className={animationClasses}>
      <span dangerouslySetInnerHTML={{ __html: displayValue }}></span>
    </PointsGameComponentContainer>
  );
};

export default PointsGameComponent;
