import React, { useCallback } from "react";
import styled from "styled-components";
import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";
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
  justify-content: center;
  > button {
    margin-bottom: 30px;
  }
`;

const RetrospacegameadventurefightsceneButtonsRow: React.FC<
  RetrospacegameadventurefightsceneButtonsRowProps
> = ({ canValidate, onValidate, onCancel }) => {
  const { push } = useGameProvider();
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
        <RetrospaceadventureButtonComponent
          preset="secondary"
          visible={!canValidate}
        >
          <img src={getAssetImg("check_disable_icon.png")} alt="" />
        </RetrospaceadventureButtonComponent>
        <RetrospaceadventureButtonComponent
          onClick={handleOnValidate}
          visible={canValidate}
          preset="secondary"
        >
          <img src={getAssetImg("check_icon.png")} alt="" />
        </RetrospaceadventureButtonComponent>
        {!onCancel && (
          <RetrospaceadventureButtonComponent
            onClick={() => {
              setTimeout(() => push("home"), 100);
            }}
            preset="secondary"
          >
            <img src={getAssetImg("menu_icon.png")} alt="" />
          </RetrospaceadventureButtonComponent>
        )}
        {onCancel && (
          <RetrospaceadventureButtonComponent
            className="animate__animated animate__bounceIn"
            onClick={handleOnCancel}
          />
        )}
      </BtnContainer>
    </Container>
  );
};

export default RetrospacegameadventurefightsceneButtonsRow;
