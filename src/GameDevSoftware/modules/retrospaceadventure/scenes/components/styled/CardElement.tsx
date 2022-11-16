import { CardContainer } from "./Card";
import { RetrospaceadventureElements } from "../../types";
import { useMemo } from "react";
import styled from "styled-components";

const CardElementContainer = styled(CardContainer)`
  justify-content: center;
  align-items: center;
`;

type CardElementProps = {
  element: RetrospaceadventureElements;
  onClick: (element: RetrospaceadventureElements) => void;
};

const CardElement: React.FC<CardElementProps> = ({ element, onClick }) => {
  const imageElement = useMemo(() => {
    switch (element) {
      case 1:
        return "Électricité";
      case 2:
        return "Matière noire";
      case 3:
        return "Feu";
    }
  }, [element]);
  return (
    <CardElementContainer
      className="animate__animated animate__bounceIn"
      onClick={() => {
        onClick(element);
      }}
    >
      {imageElement}
    </CardElementContainer>
  );
};

export default CardElement;
