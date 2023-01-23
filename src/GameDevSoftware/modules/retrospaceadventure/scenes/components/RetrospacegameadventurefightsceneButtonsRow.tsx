import React, { useCallback } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";

type RetrospacegameadventurefightsceneButtonsRowProps = {
  canValidate: boolean;
  onValidate: () => void;
  onCancel?: () => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  img {
    max-width: 90px;
    cursor: pointer;
  }
`;

const RetrospacegameadventurefightsceneButtonsRow: React.FC<
  RetrospacegameadventurefightsceneButtonsRowProps
> = ({ canValidate, onValidate, onCancel }) => {
  const { push } = useGameProvider();

  const handleOnValidate = useCallback(() => {
    setTimeout(() => onValidate(), 150);
  }, [onValidate]);

  const handleOnCancel = useCallback(() => {
    if (!onCancel) return;
    setTimeout(() => onCancel(), 150);
  }, [onCancel]);

  return (
    <Container>
      <BtnContainer>
        <RetrospaceadventureButtonComponent
          className="animate__animated animate__bounceIn"
          image="okbtn.png"
          alt=""
          visible={!canValidate}
        />
        <RetrospaceadventureButtonComponent
          onClick={handleOnValidate}
          image="okbtnactive.png"
          alt=""
          visible={canValidate}
        />
        {!onCancel && (
          <RetrospaceadventureButtonComponent
            className="animate__animated animate__bounceIn"
            onClick={() => {
              setTimeout(() => push("home"), 100);
            }}
            image="menubtnactive.png"
            alt=""
          />
        )}
        {onCancel && (
          <RetrospaceadventureButtonComponent
            className="animate__animated animate__bounceIn"
            onClick={handleOnCancel}
            image="closebtnactive.png"
            alt=""
          />
        )}
      </BtnContainer>
    </Container>
  );
};

export default RetrospacegameadventurefightsceneButtonsRow;
