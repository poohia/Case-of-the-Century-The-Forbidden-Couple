import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";
import { useEffect, useState } from "react";
import { TranslationComponent } from "../../../../../../components";

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
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  ${({ active }) => active && "border: 3px solid orange;"}
  perspective: 150rem;
  position: relative;
  box-shadow: none;
  background-color: white;
  > div {
    transition: all 0.8s ease;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
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
    }
  }
`;

const CardContainerHeaderRow = styled(ContainerRowComponent)`
  > div {
    &:nth-child(2) {
      flex: 1;
      text-align: center;
    }
  }
`;

const CardContainerRow = styled.div`
  display: flex;
  flex-direction: column;
  span {
    &:nth-child(2) {
      margin-top: 5px;
      margin-left: 2%;
      color: orange;
      font-weight: bold;
    }
  }
  padding-bottom: 5px;
  border-bottom: 1px dashed black;
`;

type CardProps = {
  card: RetrospaceadventureCard;
  active?: boolean;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, active = false, onClick }) => {
  const [initView, setInitView] = useState<boolean>(true);
  const [showEffects, setShowEffect] = useState<boolean>(false);

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
            <img
              src={card.image}
              alt=""
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowEffect(!showEffects);
              }}
            />
          </div>
          <div>
            <span>
              <TranslationComponent id={card._title} />
            </span>
          </div>
          <div>
            <span>+{card.laser}</span>
          </div>
        </CardContainerHeaderRow>
        <CardContainerRow style={{ flexDirection: "row" }}>
          <TranslationComponent id="label_damage" />
          <span>{card.damage}</span>
        </CardContainerRow>
      </div>
      <div>
        <CardContainerHeaderRow>
          <div>
            <img
              src={card.image}
              alt=""
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowEffect(!showEffects);
              }}
            />
          </div>
          <div>
            <span>
              <TranslationComponent id={card._title} />
            </span>
          </div>
          <div>
            <span>+{card.laser}</span>
          </div>
        </CardContainerHeaderRow>
        <CardContainerRow>
          <TranslationComponent id="label_critical_effect" />
          <TranslationComponent id={card.critical_effect.description} />
        </CardContainerRow>
        <CardContainerRow>
          <TranslationComponent id="label_echec_effect" />
          <TranslationComponent id={card.echec_effect.description} />
        </CardContainerRow>
      </div>
    </CardContainer>
  );
};

export default Card;
