import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { EnvType, SceneComponentProps } from "../../../../types";
import { useAssets } from "../../../../hooks";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import React, { useCallback, useEffect, useRef, useState } from "react";

type RetrospacegameadventurebdsceneHitBox = {
  width: number;
  height: number;
  top: number;
  left: number;
  content: string;
};
type RetrospacegameadventurebdscenePropsData = {
  images: { src: string; startHitboxID: number; endHitboxID: number }[];
  hitboxes: RetrospacegameadventurebdsceneHitBox[];
};

const Container = styled.div`
  background: white;
  // background: url("assets/retrospaceadventure/images/backgroundprimary.png");
`;

const RetrospacegameadventurebdsceneBD3Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    position: relative;
    width: 100%;
    height: 100%;

    &:nth-child(1) {
      grid-area: 1 / 1 / 5 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 3 / 6;
    }
    &:nth-child(3) {
      grid-area: 3 / 4 / 5 / 6;
      margin-top: 2px;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
      visibility: hidden;
      &.active {
        visibility: visible;
      }
      border: 3.5px solid black;
      border-radius: 3px;
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

const RetrospacegameadventurebdsceneBull = styled.div<
  Omit<RetrospacegameadventurebdsceneHitBox, "content"> & { env: EnvType }
>`
  position: absolute !important;
  width: ${({ width }) => `${width}%`};
  height: ${({ height }) => `${height}%`};
  top: ${({ top }) => `${top}%`};
  left: ${({ left }) => `${left}%`};
  ${({ env }) => (env === "development" ? "border: 3px solid green;" : "")}
  font-size: 1.2vw;
  overflow-y: auto;
  border-radius: 30px;
`;

export type RetrospacegameadventurebdsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurebdscenePropsData
>;

const RetrospacegameadventurebdsceneContainerFromImages: React.FC<{
  children: React.ReactNode;
  nbImage: number;
}> = ({ children, nbImage }) => {
  if (nbImage === 1) {
    return <div />;
  }
  if (nbImage === 2) {
    return <div />;
  }
  if (nbImage === 3) {
    return (
      <RetrospacegameadventurebdsceneBD3Container>
        {children}
      </RetrospacegameadventurebdsceneBD3Container>
    );
  }
  return <div />;
};

const RetrospacegameadventurebdsceneImage: React.FC<{
  children: React.ReactNode;
  timeOutToShow: number;
}> = ({ children, timeOutToShow }) => {
  const refImageDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refImageDiv.current) {
      const { children, offsetHeight, offsetWidth } = refImageDiv.current;
      const img = children[0] as HTMLImageElement;

      img.style.width = `${offsetWidth - 20}px`;
      img.style.height = `${offsetHeight - 20}px`;
      setTimeout(() => {
        img.className = "animate__animated animate__zoomIn active";
      }, timeOutToShow);
    }
  }, [refImageDiv, timeOutToShow]);

  return <div ref={refImageDiv}>{children}</div>;
};

const RetrospacegameadventurebdsceneDialogBox: React.FC<
  RetrospacegameadventurebdsceneHitBox & { env: EnvType; timeOutToShow: number }
> = ({ content, timeOutToShow, ...rest }) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), timeOutToShow);
  }, [timeOutToShow]);

  if (!visible) return <></>;

  return (
    <RetrospacegameadventurebdsceneBull {...rest}>
      <span>{content}</span>
    </RetrospacegameadventurebdsceneBull>
  );
};

const Retrospacegameadventurebdscene: RetrospacegameadventurebdsceneProps = (
  props
) => {
  const {
    data: { _actions, images, hitboxes },
  } = props;
  const { nextScene, env } = useGameProvider();
  const { getAssetImg } = useAssets();

  return (
    <PageComponent>
      <Container>
        <RetrospacegameadventurebdsceneContainerFromImages
          nbImage={images.length}
        >
          {images.map((image, i) => (
            <RetrospacegameadventurebdsceneImage
              key={`RetrospacegameadventurebdsceneImage-${image.src}-${i}`}
              timeOutToShow={i * 1000}
            >
              <img
                src={getAssetImg(image.src)}
                className="animate__animated"
                alt=""
              />
              {hitboxes.map((hitbox, j) => {
                if (j < image.startHitboxID || j > image.endHitboxID)
                  return <></>;
                return (
                  <RetrospacegameadventurebdsceneDialogBox
                    key={`RetrospacegameadventurebdsceneImage-RetrospacegameadventurebdsceneBull-${image.src}-${i}-${j}`}
                    env={env}
                    timeOutToShow={i * 1000 + 1000}
                    {...hitbox}
                  />
                );
              })}
            </RetrospacegameadventurebdsceneImage>
          ))}
          {/* <div ref={refPlanche1}>
            <img
              src={getAssetImg("testplanchebd1.png")}
              className="animate__animated"
              alt=""
            />
            <Bull1>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
              incidunt.
            </Bull1>
          </div>
          <div ref={refPlanche2}>
            <img
              src={getAssetImg("testplanchebd2.png")}
              className="animate__animated"
              alt=""
            />
          </div>
          <div ref={refPlanche3}>
            <img
              src={getAssetImg("testplanchebd3.png")}
              className="animate__animated"
              alt=""
            />
          </div> */}
        </RetrospacegameadventurebdsceneContainerFromImages>

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
