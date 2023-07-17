import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  ImgComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { SceneComponentProps } from "../../../../types";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import { useScene } from "../../../../hooks";

type RetrospacegameadventurecomicscenePropsData = {
  image: string;
  soundIcon: string;
  text1: string;
  text2: string;
};

const Container = styled.div`
  background: black;
  background: url("assets/images/backgroundprimary.png");
  background-size: cover;
`;

const RetrospacegameadventurecomicsceneComic3Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 80%;
      height: 80%;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      span {
        text-align: center;
        line-height: 26px;
        font-size: 1.1rem;
      }
      border-radius: 3px;
    }
    &:nth-child(1) {
      grid-area: 1 / 1 / 3 / 3;
    }
    &:nth-child(2) {
      grid-area: 3 / 1 / 6 / 3;
    }
    &:nth-child(3) {
      grid-area: 1 / 3 / 6 / 6;
      padding: 5px;
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
  }
`;

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenePropsData
>;

const Retrospacegameadventurecomicfirstscene: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: { image, soundIcon, text1, text2 },
    } = props;
    const { nextScene } = useScene(props.data);
    const { preloadSound, playSound, getValueFromConstant } = useGameProvider();
    const [step, setStep] = useState<0 | 1 | 2>(0);

    const pageTurnSound = useMemo(
      () => getValueFromConstant<string>("retrospaceadventure_page_turn_sound"),
      []
    );

    const toNextScene = useCallback(() => {
      playSound(pageTurnSound, 0).then(() => {
        if (step === 2) {
          nextScene();
        }
      });
    }, [step]);

    useEffect(() => {
      preloadSound(pageTurnSound, 1, false);
    }, [pageTurnSound]);

    useEffect(() => {
      if (step < 2) {
        setTimeout(() => {
          setStep((step + 1) as 0 | 1 | 2);
        }, 1500);
      }
    }, [step]);

    return (
      <PageComponent
        style={{ cursor: step === 2 ? "pointer" : "auto" }}
        onClick={toNextScene}
      >
        <Container>
          <RetrospacegameadventurecomicsceneComic3Container>
            <div className="animate__animated animate__zoomIn">
              <div>
                <TranslationComponent id={text1} />
              </div>
            </div>
            {step > 0 && (
              <div className="animate__animated animate__zoomIn">
                <div>
                  <ImgComponent src={soundIcon} />
                  <TranslationComponent id={text2} />
                </div>
              </div>
            )}
            {step > 1 && (
              <div className="animate__animated animate__zoomIn">
                <ImgComponent src={image} />
              </div>
            )}
          </RetrospacegameadventurecomicsceneComic3Container>
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicfirstscene;
