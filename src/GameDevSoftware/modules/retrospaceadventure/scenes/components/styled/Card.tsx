import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";

export const CardContainer = styled.div`
  height: 80%;
  width: 80%;
  margin: 2%;
  padding: 5px;
  padding-top: 0;
  background: white;
  color: black;
  box-shadow: 0 2px 3px rgb(0 0 0 / 40%);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <CardContainer
      onClick={onClick}
      className="animate__animated animate__bounceIn"
    >
      <CardContainerHeaderRow>
        <div>
          <img src={card.image} />
        </div>
        <div>
          <span>{card.name}</span>
        </div>
      </CardContainerHeaderRow>
      <CardContainerRow>
        <span>CC effect</span>
        <span>{card.critical_effect}</span>
      </CardContainerRow>
      <CardContainerRow>
        <span>Draw effect</span>
        <span>{card.draw_effect}</span>
      </CardContainerRow>
      <CardContainerRow>
        <span>EC effect</span>
        <span>{card.echec_effect}</span>
      </CardContainerRow>
    </CardContainer>
  );
};

export default Card;
