import { Fragment, useRef } from "react";
import {
  CardsComponentContainer,
  CardsContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import Card from "./styled/Card";
import { RetrospaceadventureCard } from "../types";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";

const RetrospacegameadventuredialogsceneCardContainer: React.FC<{
  cards: RetrospaceadventureCard[];
  onClickClose: () => void;
}> = ({ cards, onClickClose }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  return (
    <CardsComponentContainer ref={refContainer}>
      <RetrospaceadevntureTutorialComponent
        lastIcon="cancel.png"
        views={[]}
        refParentContainer={refContainer}
        onClickLastStep={onClickClose}
      >
        <CardsContainer>
          {cards.map((card) => (
            <Fragment
              key={`retrospaceadventure-dialog-scene-cards-container-card-${card.id}`}
            >
              <Card card={card} onClick={() => {}} active />
            </Fragment>
          ))}
        </CardsContainer>
      </RetrospaceadevntureTutorialComponent>
    </CardsComponentContainer>
  );
};

export default RetrospacegameadventuredialogsceneCardContainer;
