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
  box-shadow: none;
  // background-color: #6bc7f2;
  // border: 5px #1a9dd9 solid;
  // border-color: ${({ active }) => (active ? "orange" : "#1a9dd9")};
  background: white;
  border: 3px solid white;
  border-color: ${({ active }) => (active ? "#85C1E9" : "white")};

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
      // background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
      ${({ showEffects }) => showEffects && " transform: rotateY(180deg);"}
    }
    &:nth-child(2) {
      transform: rotateY(-180deg);
      overflow-y: auto;
      // img {
      //   position: absolute;
      //   bottom: 5px;
      //   right: 5px;
      //   width: 16px;
      // }
      // background-image: linear-gradient(
      //   43deg,
      //   #4158d0 0%,
      //   #c850c0 46%,
      //   #ffcc70 100%
      // );
      ${({ showEffects }) => showEffects && " transform: rotateY(0deg);"}
    }
  }
`;

const CardContainerHeaderRow = styled(ContainerRowComponent)`
  display: flex;
  flex-direction: column;
  height: 52%;
  > div {
    &:nth-child(1) {
      // background: conic-gradient(
      //   #d7d7d7,
      //   #c3c3c3,
      //   #cccccc,
      //   #c6c6c6,
      //   #d7d7d7,
      //   #c3c3c3,
      //   #cccccc,
      //   #c6c6c6,
      //   #d7d7d7,
      //   #c3c3c3,
      //   #cccccc,
      //   #c6c6c6,
      //   #d7d7d7,
      //   #c3c3c3,
      //   #cccccc,
      //   #c6c6c6
      // );
      // border: 1px solid black;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 80%;
      flex: 4;
      img {
        width: 90px;
      }
    }
    &:nth-child(2) {
      flex: 1;
      text-align: center;
      font-weight: bold;
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
    width: 16px;
  }
`;

const CardContainerEffetRow = styled.div`
  display: flex;
  flex-direction column;
  
  // padding: 0 5px;
  height: 44%;
  padding: 3% 5px;

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

const CardContainerEffectRow = styled(CardContainerRow)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    display: flex;
    justify-content: center;
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
            <span>
              <TranslationComponent id={card._title} />
            </span>
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
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowEffect(!showEffects);
        }}
      >
        <CardContainerEffetRow>
          <TranslationComponent id="label_critical_effect" />
          <TranslationComponent id={card.critical_effect.description} />
        </CardContainerEffetRow>
        <CardContainerEffetRow>
          <TranslationComponent id="label_echec_effect" />
          <TranslationComponent id={card.echec_effect.description} />
        </CardContainerEffetRow>
        {/* <img
          src={getAssetImg("information_icon.png")}
          alt=""
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowEffect(!showEffects);
          }}
        /> */}
      </div>
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
    <CardContainer
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
    </CardContainer>
  );
};

export default Card;
