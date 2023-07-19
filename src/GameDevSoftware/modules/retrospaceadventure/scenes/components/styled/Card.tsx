import styled from "styled-components";
import { RetrospaceadventureCard } from "../../types";

import "animate.css";
import { ContainerRowComponent } from "../RetrospacegameadventurefightsceneStyledComponents";
import { useEffect, useState } from "react";
import { TranslationComponent } from "../../../../../../components";
import { useAssets } from "../../../../../../hooks";
import { useGameProvider } from "../../../../../../gameProvider";

export const CardContainer = styled.div<{
  active?: boolean;
  showEffects?: boolean;
}>`
  height: 90%;
  max-height: 400px;
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
  font-family: Audiowide;
  text-shadow: none;
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
      img {
        width: 90px !important;
        object-fit: contain;
      }
    }
    &:nth-child(2) {
      text-align: center;
      font-weight: 500;
    }
  }
`;

const CardWithEffectEffect = styled(CardContainer)`
  cursor: initial;
  > div {
    &:nth-child(1) {
      justify-content: space-around;
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
  align-items: center;
  img {
    width: 24px;
  }
`;

const CardEffectSide = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const CardContainerEffetRow = styled.div`
  display: flex;
  flex-direction column;
  
  padding: 0 0 0 10px;

  >span{
    &:nth-child(1){
      margin-bottom: 0px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    &:nth-child(2){
      font-size: 0.8rem;
      font-style: italic;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  > div {
    display: flex;
    // justify-content: center;
  }
  &:after {
    content: none;
  }
`;

type CardProps = {
  card: RetrospaceadventureCard;
  active?: boolean;
  onClick: (id: number) => void;
};

const Card: React.FC<CardProps> = ({ card, active = false, onClick }) => {
  const [initView, setInitView] = useState<boolean>(true);
  const [showEffects, setShowEffect] = useState<boolean>(false);
  const { getAssetImg } = useAssets();
  const { playSound } = useGameProvider();

  useEffect(() => {
    setTimeout(() => setInitView(false), 1000);
  }, []);

  return (
    <CardContainer
      onClick={() => {
        onClick(card.id);
      }}
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
              playSound("buttonclick.mp3", 0);
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
              playSound("buttonclick.mp3", 0);
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
  const { playSound } = useGameProvider();

  useEffect(() => {
    setTimeout(() => setInitView(false), 1000);
  }, []);

  useEffect(() => {
    if (active) {
      playSound("mixkit-futuristic-cinematic-sweep-2635.mp3", 0, 0.3);
    }
  }, [active]);

  return (
    <CardWithEffectEffect
      className={`animate__animated ${initView ? "animate__bounceIn" : ""}  ${
        active ? "animate__animated animate__pulse" : ""
      }`}
      active={active}
    >
      <div>
        {/* <CardContainerHeaderRow> */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 5,
            display: "flex",
            flexDirection: "column",
            fontSize: "1rem",
            fontWeight: 100,
            alignItems: "center",
          }}
        >
          <TranslationComponent id={card._title} />
          <img
            style={{
              marginBottom: "10%",
            }}
            src={card.image}
            alt=""
          />
        </div>
        {/* <div>
            <span>
              <TranslationComponent id={card._title} />
            </span>
          </div> */}
        {/* </CardContainerHeaderRow> */}
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
              +{card.laser}
              <TranslationComponent id="retrospaceadventure_card_name_laser_cannon" />
            </span>
          </div>
        </CardContainerEffectRow>
        <CardContainerEffetRow>
          {effect === "critical" ? (
            <>
              <TranslationComponent id={card.critical_effect.description} />
              <TranslationComponent id="label_critical_effect" />
            </>
          ) : (
            <>
              <TranslationComponent id={card.echec_effect.description} />
              <TranslationComponent id="label_echec_effect" />
            </>
          )}
        </CardContainerEffetRow>
      </div>
    </CardWithEffectEffect>
  );
};

export default Card;
