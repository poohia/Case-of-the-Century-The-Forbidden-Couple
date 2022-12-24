import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";
import { useAssets } from "../../../../hooks";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import { useEffect, useRef } from "react";

const Container = styled.div`
  background: white;
  padding: 10px;
  // background: url("assets/retrospaceadventure/images/backgroundprimary.png");
`;

const RetrospacegameadventurebdsceneBDContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  div {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 5px;
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-size: auto 100%;
    // background-color: transparent;
    // background-position: center;

    &:nth-child(1) {
      grid-area: 1 / 1 / 5 / 4;
      // background-image: url("assets/retrospaceadventure/images/testplanchebd1.png");
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 3 / 6;
      // background-image: url("assets/retrospaceadventure/images/testplanchebd2.png");
    }
    &:nth-child(3) {
      grid-area: 3 / 4 / 5 / 6;
      // background-image: url("assets/retrospaceadventure/images/testplanchebd3.png");
      margin-top: 2px;
    }
    img {
      max-width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const RetrospacegameadventurebdsceneButtonAction = styled.div`
  position: absolute;
  bottom: 10px;
  right: 20px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid black;
  overflow: hidden;
  img {
    width: 60px;
    border-radius: 50%;
  }
`;

export type RetrospacegameadventurebdsceneProps = SceneComponentProps<{}>;

const Retrospacegameadventurebdscene: RetrospacegameadventurebdsceneProps = (
  props
) => {
  const {
    data: { _actions },
  } = props;
  const { nextScene } = useGameProvider();
  const { getAssetImg } = useAssets();
  console.log(
    "🚀 ~ file: Retrospacegameadventurebdscene.tsx:10 ~ _actions",
    _actions
  );
  const refPlanche1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refPlanche1.current) {
      const {
        current: { children, offsetHeight, offsetWidth },
      } = refPlanche1;
      const img = children[0] as any;
      console.log(
        "🚀 ~ file: Retrospacegameadventurebdscene.tsx:95 ~ useEffect ~ img",
        img
      );
      img.style.width = offsetWidth - 20;
      img.style.height = offsetHeight - 20;
    }
  }, [refPlanche1]);

  return (
    <PageComponent>
      <Container>
        <RetrospacegameadventurebdsceneBDContainer>
          <div className="animate__animated animate__zoomIn" ref={refPlanche1}>
            <img src={getAssetImg("testplanchebd1.png")} alt="" />
          </div>
          <div className="animate__animated animate__zoomIn">
            <img src={getAssetImg("testplanchebd2.png")} alt="" />
          </div>
          <div className="animate__animated animate__zoomIn">
            <img src={getAssetImg("testplanchebd3.png")} alt="" />
          </div>
        </RetrospacegameadventurebdsceneBDContainer>
        <RetrospacegameadventurebdsceneButtonAction
          className="animate__animated animate__backInUp"
          onClick={() => nextScene(_actions[0]._scene)}
        >
          <img src={getAssetImg("swords.png")} alt="" />
        </RetrospacegameadventurebdsceneButtonAction>
      </Container>
    </PageComponent>
  );
};

export default Retrospacegameadventurebdscene;
