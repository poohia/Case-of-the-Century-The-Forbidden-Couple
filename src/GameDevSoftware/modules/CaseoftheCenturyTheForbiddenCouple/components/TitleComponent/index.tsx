import "animate.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

import { TranslationComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";

const TitleComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  padding: 0 1rem; // Padding horizontal

  h1 {
    margin: 0;
    /* clamp(MIN, PREFERRED, MAX) */
    font-size: clamp(1.8rem, 6vw, 4rem); // Ex: min 1.8rem, idéal 4vw, max 4rem
    text-align: center;
    max-width: 1920px; // Garde la limite max-width
  }

  h2 {
    margin: 0;
    font-size: clamp(1.3rem, 3vw, 3rem); // Ex: min 1.3rem, idéal 3vw, max 3rem
    text-align: center;
    max-width: 1920px; // Garde la limite max-width
  }
`;

type TitleComponentProps = {
  titleId1: string;
  titleId2: string;
  onAnimationFinished: () => void;
};
const TitleComponent: React.FC<TitleComponentProps> = ({
  titleId1,
  titleId2,
  onAnimationFinished,
}) => {
  const [showSecondTitle, setShowSecondTitle] = useState<boolean>(false);
  const { getValueFromConstant } = useGameProvider();

  useEffect(() => {
    if (showSecondTitle) {
      setTimeout(() => {
        onAnimationFinished();
      }, getValueFromConstant<number>("animation_animatecss_timeout_fast"));
    }
  }, [showSecondTitle]);

  useEffect(() => {
    setTimeout(() => {
      setShowSecondTitle(true);
    }, getValueFromConstant("animation_animatecss_timeout_fast"));
  }, []);

  return (
    <TitleComponentContainer>
      <h1 className="animate__animated animate__zoomIn animate__faster">
        <TranslationComponent id={titleId1} />
      </h1>
      <h2
        className={
          showSecondTitle
            ? "animate__animated animate__zoomIn animate__faster"
            : ""
        }
        style={{ visibility: showSecondTitle ? "visible" : "hidden" }}
      >
        <TranslationComponent id={titleId2} />
      </h2>
    </TitleComponentContainer>
  );
};

export default TitleComponent;
