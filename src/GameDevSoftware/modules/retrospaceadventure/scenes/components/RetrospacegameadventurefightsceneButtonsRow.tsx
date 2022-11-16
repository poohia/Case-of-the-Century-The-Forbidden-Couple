import React, { useCallback } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../hooks";
import FightButton from "./styled/FightButton";

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

const RetrospacegameadventurefightsceneButtonsRow: React.FC<
  RetrospacegameadventurefightsceneButtonsRowProps
> = ({ canValidate, onValidate, onCancel }) => {
  const { getAsset } = useAssets();

  const handleOnValidate = useCallback(() => {
    setTimeout(() => onValidate(), 150);
  }, [onValidate]);

  const handleOnCancel = useCallback(() => {
    if (!onCancel) return;
    setTimeout(() => onCancel(), 150);
  }, [onCancel]);

  return (
    <Container>
      <FightButton
        preset="valide"
        onClick={handleOnValidate}
        disabled={!canValidate}
      >
        <img src={getAsset("check.png", "image") as string} alt="" />
      </FightButton>
      {onCancel && (
        <FightButton preset="cancel" onClick={handleOnCancel}>
          <img src={getAsset("cross.png", "image") as string} alt="" />
        </FightButton>
      )}
    </Container>
  );
};

export default RetrospacegameadventurefightsceneButtonsRow;
