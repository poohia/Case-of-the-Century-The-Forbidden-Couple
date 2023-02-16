import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";
import { useEffect, useState } from "react";
import { TranslationComponent } from "../../../../../../components";
import { useAssets } from "../../../../../../hooks";

export const CardContainer = styled.div<{
  active?: boolean;
  showEffects: boolean;
}>`
  height: 90%;
  margin: 1%;
  padding: ${({ active }) => (active ? "2px" : "5px")};
  padding-top: 0;
  background: white;
  color: black;
  box-shadow: 0 2px 3px rgb(0 0 0 / 40%);
  border-radius: 10px;
  cursor: pointer;

  perspective: 150rem;
  position: relative;
  box-shadow: none;
  background-color: #6bc7f2;
  border: 5px #1a9dd9 solid;
  ${({ active }) => active && "border: 5px solid orange;"}
  > div {
    transition: all 0.8s ease;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    &:nth-child(1) {
      // background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
      ${({ showEffects }) => showEffects && " transform: rotateY(180deg);"}
    }
    &:nth-child(2) {
      transform: rotateY(-180deg);
      // background-image: linear-gradient(
      //   43deg,
      //   #4158d0 0%,
      //   #c850c0 46%,
      //   #ffcc70 100%
      // );
      ${({ showEffects }) => showEffects && " transform: rotateY(0deg);"}
      justify-content: space-around;
      padding: 0 5px;
    }
  }
`;

const CardContainerHeaderRow = styled(ContainerRowComponent)`
  display: flex;
  flex-direction: column;
  height: 52%;
  > div {
    &:nth-child(1) {
      background: conic-gradient(
        #d7d7d7,
        #c3c3c3,
        #cccccc,
        #c6c6c6,
        #d7d7d7,
        #c3c3c3,
        #cccccc,
        #c6c6c6,
        #d7d7d7,
        #c3c3c3,
        #cccccc,
        #c6c6c6,
        #d7d7d7,
        #c3c3c3,
        #cccccc,
        #c6c6c6
      );
      border: 1px solid black;
      margin: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 80%;
      flex: 4;
      img {
        width: 48px;
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
  &:after {
    content: "";
    margin-left: 0%;
    width: 80%;
    background: white;
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
  font-weight: bold;
  padding: 0 20px;
  >span{
    &:nth-child(1){
      margin-bottom: 10px;
      font-size: 1.1rem;
      &:after{
        content: " :";
      }
    }
    &:nth-child(2){
      font-size: 0.9rem;
    }
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
          {/* <div>
            <span>+{card.laser}</span>
          </div> */}
        </CardContainerHeaderRow>
        <CardContainerRow>
          <img src={getAssetImg("degat_icon.png")} alt="" />
          <span>
            + {card.damage} <TranslationComponent id="label_damage" />
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
      </div>
    </CardContainer>
  );
};

export default Card;
