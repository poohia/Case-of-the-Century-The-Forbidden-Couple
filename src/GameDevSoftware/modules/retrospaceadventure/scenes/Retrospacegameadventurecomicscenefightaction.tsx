import { useEffect, useMemo, useState, Fragment } from "react";
import styled from "styled-components";
import {
  ImgComponent,
  ImgFromSpriteComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { useAssets } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import { useGameProvider } from "../../../../gameProvider";

type RetrospacegameadventurecomicscenefightactionPropsData = {
  image: string;
  image_robot_sprite: string;
  image_robot_atlas: string;
  sprite_idle_name: string;
  sprite_idle_damage: string;
  icon_degat: string;
};

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenefightactionPropsData
>;

const Container = styled.div<{
  iconDegat: string;
  life: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 100%;
  background: url("assets/images/backgroundprimary.png");
  > div {
    &:nth-child(1) {
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    &:nth-child(2) {
      position: absolute;
      top: 7%;
      display: flex;
      flex-direction: column;
      width: 75%;
      div {
        &:nth-child(1) {
          align-self: flex-end;
          margin-right: 2%;
          color: white;
          font-size: 0.8rem;
        }
        &:nth-child(2) {
          position: relative;
          height: 20px;
          padding: 1px;
          background: rgb(1, 1, 1);
          background: linear-gradient(
            98deg,
            rgba(1, 1, 1, 1) 0%,
            rgba(40, 39, 39, 1) 67%,
            rgba(56, 56, 56, 1) 100%
          );

          div {
            width: ${({ life }) => `${life}%`};
            transition: width 500ms;
            height: 100%;
            background: rgb(226, 35, 35);
            background: linear-gradient(
              180deg,
              rgba(226, 35, 35, 1) 0%,
              rgba(116, 11, 11, 1) 100%
            );
            border: none;
          }
        }
      }
    }
    &:nth-child(3) {
      position: absolute;
      left: 45%;
      top: 25%;
      width: 20%;
      height: 70%;
      cursor: url("${({ iconDegat }) => iconDegat}"), pointer;
    }
  }
`;

type DamageIcons = {
  id: number;
  x: number;
  y: number;
}[];

const Retrospacegameadventurecomicscenefightactionaction: RetrospacegameadventurecomicsceneProps =
  (props) => {
    const {
      data: {
        _actions,
        image,
        image_robot_atlas,
        image_robot_sprite,
        sprite_idle_damage,
        sprite_idle_name,
        icon_degat,
      },
    } = props;
    const [disableAttack, setDisableAttack] = useState<boolean>(false);
    const [life, setLife] = useState<number>(0);
    const [damageIcons, setDamageIcons] = useState<DamageIcons>([]);
    const { nextScene, setPrimaryFont } = useGameProvider();
    const { getAssetImg } = useAssets();

    const lastDamageIcon = useMemo(
      () => damageIcons[damageIcons.length - 1],
      [damageIcons]
    );

    useEffect(() => {
      setPrimaryFont("ihtacs");
    }, []);

    useEffect(() => {
      setLife(100);
    }, []);

    useEffect(() => {
      if (life !== 0 && life <= 80) {
        setDisableAttack(true);
      }
    }, [life]);

    useEffect(() => {
      setInterval(() => {
        setDamageIcons((_damageIcons) =>
          _damageIcons.filter((_, i) => i !== 0)
        );
      }, 300);
    }, []);

    return (
      <PageComponent>
        <Container iconDegat={getAssetImg(icon_degat)} life={life}>
          <div>
            <ImgComponent src={getAssetImg(image)} />
          </div>
          <div>
            <div>
              <span>R5-D4-GPT</span>
            </div>
            <div>
              <div />
            </div>
          </div>
          <div
            onClick={(event) => {
              event.stopPropagation();
              if (disableAttack === false) {
                setDamageIcons(
                  damageIcons.concat({
                    id: lastDamageIcon?.id + 1 || 0,
                    x: event.clientX,
                    y: event.clientY,
                  })
                );
                setLife(life - 0.5);
              }
            }}
          >
            <ImgFromSpriteComponent
              atlasFile={image_robot_atlas}
              frameName={sprite_idle_name}
              imageFile={image_robot_sprite}
              responsive={true}
              center
              blockAtMinSize
            />
          </div>
          {damageIcons.map((icon) => (
            <Fragment key={`damage_icon_${icon.id}`}>
              <ImgComponent
                style={{ position: "absolute", top: icon.y, left: icon.x }}
                src={getAssetImg(icon_degat)}
              />
            </Fragment>
          ))}
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenefightactionaction;
