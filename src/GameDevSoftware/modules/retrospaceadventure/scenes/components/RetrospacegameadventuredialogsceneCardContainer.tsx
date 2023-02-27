import { Fragment } from "react";
import {
  CardsComponentContainer,
  CardsContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import { useAssets } from "../../../../../hooks";
import Card from "./styled/Card";
import { RetrospaceadventureCard } from "../types";

const RetrospacegameadventuredialogsceneCardContainer: React.FC<{
  cards: RetrospaceadventureCard[];
  onClickClose: () => void;
}> = ({ cards, onClickClose }) => {
  const { getAssetImg } = useAssets();
  return (
    <CardsComponentContainer>
      <div>
        <img
          className="animate__animated animate__bounceIn"
          src={getAssetImg("cancel.png")}
          alt=""
          onClick={onClickClose}
        />
      </div>
      <CardsContainer>
        {cards.map((card) => (
          <Fragment
            key={`retrospaceadventure-dialog-scene-cards-container-card-${card.id}`}
          >
            <Card card={card} onClick={() => {}} />
          </Fragment>
        ))}
      </CardsContainer>
    </CardsComponentContainer>
  );
};

export default RetrospacegameadventuredialogsceneCardContainer;
