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

const PointsGameComponentContainer = styled.section`
  position: absolute;
  top: clamp(15px, var(--sat), var(--sat));
  left: 0;
  padding: 4px;
  padding-left: clamp(15px, calc(var(--sal) - 20px), var(--sal));
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1rem;
  font-weight: 550;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  opacity: 0.9;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-left: none;
  span {
    font-size: var(--font-size);
  }
`;

const PointsGameComponent: React.FC<{ points: number }> = ({ points }) => {
  const { translateText } = useGameProvider();
  const textPoints = useMemo(() => translateText("label_points"), []);
  const [displayValue, setDisplayValue] = useState<string>(
    `${points} ${textPoints}`
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
        setDisplayValue(`${points} ${textPoints}`);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setDisplayValue(`${points} ${textPoints}`);
    }
  }, [points]);

  const animationClasses = isAnimating
    ? "animate__animated animate__pulse"
    : "";

  return (
    <PointsGameComponentContainer
      className={animationClasses}
      aria-label={translateText("aria_label_points_section")}
    >
      <span>{displayValue}</span>
    </PointsGameComponentContainer>
  );
};

export default PointsGameComponent;
