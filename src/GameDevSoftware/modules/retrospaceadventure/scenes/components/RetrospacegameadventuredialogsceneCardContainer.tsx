import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import {
  CardsComponentContainer,
  CardsContainer,
} from "./RetrospacegameadventuredialogsceneStyledComponents";
import Card from "./styled/Card";
import { RetrospaceadventureCard } from "../types";
import RetrospaceadevntureTutorialComponent from "./RetrospaceadevntureTutorialComponent";
import { useGameProvider } from "../../../../../gameProvider";
import { useConstants } from "../../../../../gameProvider/hooks";
import { TranslationComponent } from "../../../../../components";

const RetrospacegameadventuredialogsceneCardContainer: React.FC<{
  cards: RetrospaceadventureCard[];
  onClickClose: () => void;
}> = ({ cards, onClickClose }) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { innerHeight, innerWidth, getValueFromConstant } = useGameProvider();
  const [showBackgroundOpacity, setShowBackgroundOpacity] =
    useState<boolean>(true);
  // const { getValueFromConstant } = useConstants();

  const maxSizeGameContainer = useMemo(() => {
    const [width, height] = getValueFromConstant(
      "retrospaceadventure_max_width_height_views"
    );
    return { width, height };
  }, [getValueFromConstant]);

  useEffect(() => {
    if (
      innerHeight > maxSizeGameContainer.height ||
      innerWidth > maxSizeGameContainer.width
    ) {
      setShowBackgroundOpacity(false);
    } else {
      setShowBackgroundOpacity(true);
    }
  }, [innerHeight, innerWidth, maxSizeGameContainer]);

  return (
    <CardsComponentContainer
      showBackgroundOpacity={showBackgroundOpacity}
      ref={refContainer}
    >
      <RetrospaceadevntureTutorialComponent
        lastIcon="cancel.png"
        views={[]}
        refParentContainer={refContainer}
        onClickLastStep={onClickClose}
      >
        <CardsContainer>
          <h3>
            <TranslationComponent id="retrospaceadventure_dialog_choices_title" />
          </h3>
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
