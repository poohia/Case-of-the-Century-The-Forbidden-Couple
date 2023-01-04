import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { EnvType, SceneComponentProps } from "../../../../types";
import { useAssets } from "../../../../hooks";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurebdsceneHitBox = {
  width: number;
  height: number;
  top: number;
  left: number;
  fontSize: number;
  content: string;
};
type RetrospacegameadventurebdscenePropsData = {
  images: { src: string; startHitboxID: number; endHitboxID: number }[];
  hitboxes: RetrospacegameadventurebdsceneHitBox[];
};

const Container = styled.div`
  background: white;
  background: url("assets/retrospaceadventure/images/backgroundprimary.png");
`;

const RetrospacegameadventurebdsceneBD1Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div:nth-child(1) {
    grid-area: 1 / 1 / 6 / 6;
  }
`;

const RetrospacegameadventurebdsceneBD2Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    &:nth-child(1) {
      grid-area: 1 / 1 / 6 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 6 / 7;
    }
  }
`;

const RetrospacegameadventurebdsceneBDDivImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RetrospacegameadventurebdsceneBDImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  visibility: hidden;
  &.active {
    visibility: visible;
  }
  border: 3.5px solid black;
  border-radius: 3px;
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

    &:nth-child(1) {
      grid-area: 1 / 1 / 5 / 4;
    }
    &:nth-child(2) {
      grid-area: 1 / 4 / 3 / 6;
    }
    &:nth-child(3) {
      grid-area: 3 / 4 / 5 / 6;
    }
  }
`;

const RetrospacegameadventurebdsceneBD4Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 100%;
  > div {
    position: relative;

    &:nth-child(1) {
      grid-area: 1 / 1 / 4 / 3;
    }
    &:nth-child(2) {
      grid-area: 4 / 1 / 7 / 3;
    }
    &:nth-child(3) {
      grid-area: 1 / 3 / 4 / 5;
    }
    &:nth-child(4) {
      grid-area: 4 / 3 / 7 / 5;
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
  ${({ env }) => (env === "development" ? "border: 1px solid green;" : "")}
  font-size: ${({ fontSize }) => `${fontSize}vw`};
  overflow-y: auto;
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
    return (
      <RetrospacegameadventurebdsceneBD1Container>
        {children}
      </RetrospacegameadventurebdsceneBD1Container>
    );
  }
  if (nbImage === 2) {
    return (
      <RetrospacegameadventurebdsceneBD2Container>
        {children}
      </RetrospacegameadventurebdsceneBD2Container>
    );
  }
  if (nbImage === 3) {
    return (
      <RetrospacegameadventurebdsceneBD3Container>
        {children}
      </RetrospacegameadventurebdsceneBD3Container>
    );
  }
  if (nbImage === 4) {
    return (
      <RetrospacegameadventurebdsceneBD4Container>
        {children}
      </RetrospacegameadventurebdsceneBD4Container>
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
      // const { naturalHeight, naturalWidth } = img;
      // const width =
      //   naturalWidth > offsetWidth ? offsetWidth - 20 : naturalWidth;
      // const height =
      //   naturalHeight > offsetHeight ? offsetHeight - 20 : naturalHeight;

      const width = offsetWidth - 20,
        height = offsetHeight - 20;

      img.style.width = `${width}px`;
      img.style.height = `${height}px`;
      setTimeout(() => {
        img.className = `${img.className} animate__zoomIn active`;
      }, timeOutToShow);
    }
  }, [refImageDiv, timeOutToShow]);

  return (
    <RetrospacegameadventurebdsceneBDDivImg ref={refImageDiv}>
      {children}
    </RetrospacegameadventurebdsceneBDDivImg>
  );
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
              <RetrospacegameadventurebdsceneBDImg
                src={getAssetImg(image.src)}
                className="animate__animated"
                alt=""
              />
              {hitboxes?.map((hitbox, j) => {
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
