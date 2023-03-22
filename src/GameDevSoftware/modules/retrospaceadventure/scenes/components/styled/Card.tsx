import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";
import { useEffect, useState } from "react";
import { TranslationComponent } from "../../../../../../components";
import { useAssets } from "../../../../../../hooks";

export const CardContainer = styled.div<{
  active?: boolean;
  showEffects?: boolean;
}>`
  height: 90%;
  margin: 1%;
  padding-top: 0;
  color: black;
  box-shadow: 0 2px 3px rgb(0 0 0 / 40%);
  border-radius: 10px;
  cursor: pointer;

  perspective: 150rem;
  position: relative;

  background: white;
  border: 2px solid white;
  box-shadow: ${({ active, theme }) =>
    active
      ? `${theme.card.firstBorderSecondary} 5px 5px, ${theme.card.secondBorderSecondary} 10px 10px`
      : `${theme.card.firstBorderPrimary} 5px 5px, ${theme.card.secondBorderPrimary} 10px 10px`};
  border-color: ${({ active, theme }) =>
    active ? theme.colors.secodary : theme.colors.primary};
  > div {
    transition: all 0.8s ease;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:nth-child(1) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      ${({ showEffects }) => showEffects && " transform: rotateY(180deg);"}
    }
    &:nth-child(2) {
      transform: rotateY(-180deg);
      overflow-y: auto;
      ${({ showEffects }) => showEffects && " transform: rotateY(0deg);"}
      > div {
        flex: 1;
        &:nth-child(1) {
          flex: 0;
        }
      }
    }
  }
`;

const CardContainerHeaderRow = styled(ContainerRowComponent)`
  display: flex;
  flex-direction: column;
  height: 52%;
  > div {
    &:nth-child(1) {
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 80%;
      // flex: 4;
      img {
        width: 90px !important;
        // height: 45px;
        // height: 70%;
        object-fit: contain;
      }
    }
    &:nth-child(2) {
      // flex: 1;
      text-align: center;
      font-weight: bold;
    }
  }
`;

const CardWithEffectEffect = styled(CardContainer)`
  cursor: initial;
  > div {
    &:nth-child(1) {
      > div {
        &:nth-child(1) {
          img {
            width: 60px;
          }
        }
      }
    }
  }
`;

const CardContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 0.8rem;
  img {
    width: 24px;
    margin-right: 5px;
  }
  padding-bottom: 5px;
  padding-left: 8px;
  align-items: center;
  &:after {
    content: "";
    margin-left: 0%;
    width: 80%;
    background: black;
    height: 1px;
    position: absolute;
    left: 10%;
    bottom: -5px;
  }
`;

const CardContainerRowEffect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 5px;
  img {
    width: 24px;
  }
`;

const CardEffectSide = styled.div`
  display: flex;
  flex-direction: column;
  // flex-wrap: wrap;
  overflow-y: auto;
`;

const CardContainerEffetRow = styled.div`
  display: flex;
  flex-direction column;
  
  padding: 0 0 10px 10px;

  >span{
    &:nth-child(1){
      margin-bottom: 10px;
      font-size: 1.1rem;
      font-weight: bold;
      &:after{
        content: " :";
      }
    }
    &:nth-child(2){
      font-size: 0.9rem;
    }
  }
`;

const CardContainerEffetBackRow = styled(CardContainerEffetRow)`
  margin-top: 5px;
  padding-bottom: 0px;
  img {
    width: 24px;
  }
`;

const CardContainerEffetCardInfoRow = styled(CardContainerEffetBackRow)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  img {
    position: relative;
    top: -30px;
    right: 5px;
    flex-basis: 55%;
    max-width: 68px !important;
  }
  > span {
    &:nth-child(1) {
      &:after {
        content: "";
      }
    }
  }
`;

const CardContainerEffectRow = styled(CardContainerRow)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    display: flex;
    justify-content: center;
  }
  &:after {
    content: none;
  }
`;

type CardProps = {
  card: RetrospaceadventureCard;
  active?: boolean;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, active = false, onClick }) => {
  const [initView, setInitView] = useState<boolean>(true);
  const [showEffects, setShowEffect] = useState<boolean>(false);
  const { getAssetImg } = useAssets();

  useEffect(() => {
    setTimeout(() => setInitView(false), 1000);
  }, []);

  return (
    <CardContainer
      onClick={onClick}
      className={`animate__animated ${initView ? "animate__bounceIn" : ""}  ${
        active ? "animate__animated animate__pulse" : ""
      }`}
      active={active}
      showEffects={showEffects}
    >
      <div>
        <CardContainerHeaderRow>
          <div>
            <img src={card.image} alt="" />
          </div>
          <div>
            <TranslationComponent id={card._title} />
          </div>
        </CardContainerHeaderRow>
        <CardContainerRow>
          <img src={getAssetImg("degat_icon.png")} alt="" />
          <span>
            {card.damage} <TranslationComponent id="label_damage" />
          </span>
        </CardContainerRow>
        <CardContainerRow>
          <img src={getAssetImg("cannon.png")} alt="" />
          <span>
            +{card.laser}{" "}
            <TranslationComponent id="retrospaceadventure_card_name_laser_cannon" />
          </span>
        </CardContainerRow>
        <CardContainerRowEffect>
          <span>
            <TranslationComponent id="label_effects" />
          </span>
          <img
            src={getAssetImg("information_icon.png")}
            alt=""
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowEffect(!showEffects);
            }}
          />
        </CardContainerRowEffect>
      </div>
      <CardEffectSide>
        <CardContainerEffetBackRow>
          <img
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowEffect(!showEffects);
            }}
            src={getAssetImg("back-button.png")}
            alt=""
          />
        </CardContainerEffetBackRow>
        <CardContainerEffetCardInfoRow>
          <TranslationComponent id={card._title} />{" "}
          <img src={card.image} alt="" />
        </CardContainerEffetCardInfoRow>
        <CardContainerEffetRow>
          <TranslationComponent id="label_critical_effect" />
          <TranslationComponent id={card.critical_effect.description} />
        </CardContainerEffetRow>
        <CardContainerEffetRow>
          <TranslationComponent id="label_echec_effect" />
          <TranslationComponent id={card.echec_effect.description} />
        </CardContainerEffetRow>
      </CardEffectSide>
    </CardContainer>
  );
};

export const CardWithEffect: React.FC<
  Omit<CardProps, "onClick"> & {
    effect: "critical" | "echec";
  }
> = ({ card, active = false, effect }) => {
  const [initView, setInitView] = useState<boolean>(true);
  const { getAssetImg } = useAssets();

  useEffect(() => {
    setTimeout(() => setInitView(false), 1000);
  }, []);

  return (
    <CardWithEffectEffect
      className={`animate__animated ${initView ? "animate__bounceIn" : ""}  ${
        active ? "animate__animated animate__pulse" : ""
      }`}
      active={active}
    >
      <div>
        <CardContainerHeaderRow>
          <div>
            <img src={card.image} alt="" />
          </div>
          <div>
            <span>
              <TranslationComponent id={card._title} />
            </span>
          </div>
        </CardContainerHeaderRow>
        <CardContainerEffectRow>
          <div>
            <img src={getAssetImg("degat_icon.png")} alt="" />
            <span>
              {card.damage} <TranslationComponent id="label_damage" />
            </span>
          </div>
          <div>
            <img src={getAssetImg("cannon.png")} alt="" />
            <span>
              +{card.laser}{" "}
              <TranslationComponent id="retrospaceadventure_card_name_laser_cannon" />
            </span>
          </div>
        </CardContainerEffectRow>
        <CardContainerEffetRow>
          {effect === "critical" ? (
            <>
              <TranslationComponent id="label_critical_effect" />
              <TranslationComponent id={card.critical_effect.description} />
            </>
          ) : (
            <>
              <TranslationComponent id="label_echec_effect" />
              <TranslationComponent id={card.echec_effect.description} />
            </>
          )}
        </CardContainerEffetRow>
      </div>
    </CardWithEffectEffect>
  );
};

export default Card;
