import React, { useCallback, useContext } from "react";
import styled from "styled-components";

import { useGameProvider } from "../../../../../gameProvider";
import RetrospaceadventureButtonComponent from "./styled/RetrospaceadventureButtonComponent";
import { useAssets } from "../../../../../hooks";
import RetrospaceadventureGameContext from "../contexts/RetrospaceadventureGameContext";

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
  width: 100%;
  justify-content: center;
  align-items: center;
  // > button {
  //   margin-bottom: 30px;
  // }
  > div {
    width: 120px;
    height: 90px;
    margin: 8%;
    img {
      width: 30px;
    }
  }
`;

const RetrospacegameadventurefightsceneButtonsRow: React.FC<
  RetrospacegameadventurefightsceneButtonsRowProps
> = ({ canValidate, onValidate, onCancel }) => {
  const { env, push } = useGameProvider();
  const { getAssetImg } = useAssets();
  const { updateEnemy } = useContext(RetrospaceadventureGameContext);

  const passFight = useCallback(() => {
    if (env === "development") {
      updateEnemy((_enemy) => ({ ..._enemy, life: 0 }));
    }
  }, [env]);

  const handleOnValidate = useCallback(() => {
    setTimeout(() => onValidate(), 150);
  }, [onValidate]);

  const handleOnCancel = useCallback(() => {
    if (!onCancel) {
      return;
    }
    setTimeout(() => onCancel(), 150);
  }, [onCancel]);

  return (
    <Container>
      <BtnContainer>
        <RetrospaceadventureButtonComponent
          preset="secondary"
          visible={!canValidate}
          disabled
        >
          <img
            onClick={passFight}
            src={getAssetImg("check_disable_icon.png")}
            alt=""
          />
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
