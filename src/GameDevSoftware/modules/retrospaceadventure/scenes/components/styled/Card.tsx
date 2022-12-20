import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";
import { useEffect, useState } from "react";

export const CardContainer = styled.div<{ active?: boolean }>`
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
  ${({ active }) => active && "border: 3px solid orange;"}
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
    >
      <CardContainerHeaderRow>
        <div>
          <img src={card.image} alt="" />
        </div>
        <div>
          <span>{card.name}</span>
        </div>
        <div>
          <span>+{card.laser}</span>
        </div>
      </CardContainerHeaderRow>
      <CardContainerRow>
        <span>Damage</span>
        <span>{card.damage}</span>
      </CardContainerRow>
      <CardContainerRow>
        <span>CC effect</span>
        <span>{card.critical_effect._title}</span>
      </CardContainerRow>
      <CardContainerRow>
        <span>EC effect</span>
        <span>{card.echec_effect._title}</span>
      </CardContainerRow>
    </CardContainer>
  );
};

export default Card;
