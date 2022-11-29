import React, { useCallback } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";

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
  }
`;

const RetrospacegameadventurefightsceneButtonsRow: React.FC<
  RetrospacegameadventurefightsceneButtonsRowProps
> = ({ canValidate, onValidate, onCancel }) => {
  const { getAssetImg } = useAssets();

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
        {!canValidate && (
          <img
            className="animate__animated animate__bounceIn"
            src={getAssetImg("okbtn.png")}
            alt=""
          />
        )}
        {canValidate && (
          <img
            onClick={handleOnValidate}
            src={getAssetImg("okbtnactive.png")}
            alt=""
          />
        )}
        {onCancel && (
          <img
            className="animate__animated animate__bounceIn"
            onClick={handleOnCancel}
            src={getAssetImg("closebtnactive.png")}
            alt=""
          />
        )}
      </BtnContainer>
    </Container>
  );
};

export default RetrospacegameadventurefightsceneButtonsRow;
