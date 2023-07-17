import { useEffect, useMemo, useState, Fragment } from "react";
import styled from "styled-components";
import {
  AnimationComponent,
  ImgComponent,
  ImgFromSpriteComponent,
  PageComponent,
  TranslationComponent,
} from "../../../../components";
import { useAssets, useScene } from "../../../../hooks";
import { SceneComponentProps } from "../../../../types";
import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import RetrospaceadventureNotification from "./components/RetrospaceadventureNotification";

type RetrospacegameadventurecomicscenefightactionPropsData = {
  image: string;
  image_robot_sprite: string;
  image_robot_atlas: string;
  sprite_idle_name: string;
  sprite_idle_damage: string;
  icon_degat: string;
  image_robot_animation: string;
  heal_animation_text: string;
  image_bull: string;
  bull_text: string;
  bull_text_2: string;
  bull_text_3: string;
  heal_sound: string;
};

export type RetrospacegameadventurecomicsceneProps = SceneComponentProps<
  {},
  RetrospacegameadventurecomicscenefightactionPropsData
>;

const Container = styled.div<{
  disable: boolean;
  iconDegat: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  height: 100%;
  background: url("assets/images/backgroundprimary.png");
  > div {
    position: relative;
    &:nth-child(1) {
      img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
      }
    }
    &:nth-child(2) {
    }
    &:nth-child(3) {
      position: absolute;
      left: 45%;
      top: 25%;
      width: 20%;
      height: 70%;
      ${({ disable, iconDegat }) =>
        !disable && `cursor: url("${iconDegat}"), pointer;`}
    }
    &:nth-child(4) {
      position: absolute;
      left: 58%;
      top: 20%;
      img {
        width: 60%;
        // height: 40%;
      }
      span {
        position: absolute;
        top: 24%;
        left: 17%;
        width: 25%;
        font-size: 1.3rem;
      }
      @media screen and (max-width: 897px) {
        span {
          font-size: 80%; /* le texte prendra 100% de la taille de la div parent */
        }
      }
    }
  }
`;

const BarLifeContainer = styled.div<{ life: number }>`
  position: absolute;
  top: 2%;
  display: flex;
  flex-direction: column;
  width: 96%;
  left: 2%;
  div {
    &:nth-child(1) {
      align-self: flex-end;
      margin-right: 1%;
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
        image,
        image_robot_atlas,
        image_robot_sprite,
        sprite_idle_damage,
        sprite_idle_name,
        image_robot_animation,
        icon_degat,
        heal_animation_text,
        image_bull,
        bull_text,
        bull_text_2,
        bull_text_3,
        heal_sound,
      },
    } = props;
    const { nextScene } = useScene(props.data, { primarySoundVolume: 0.4 });
    const [step, setStep] = useState<0 | 1 | 2>(0);
    const [disableAttack, setDisableAttack] = useState<boolean>(false);
    const [life, setLife] = useState<number>(0);
    const [damageIcons, setDamageIcons] = useState<DamageIcons>([]);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [showBull, setShowBull] = useState<boolean>(true);
    const {
      playSoundWithPreload,
      getValueFromConstant,
      releaseSound,
      playSoundEffect,
    } = useGameProvider();
    const { getAssetImg } = useAssets();

    const lastDamageIcon = useMemo(
      () => damageIcons[damageIcons.length - 1],
      [damageIcons]
    );

    const soulBossSound = useMemo(
      () => getValueFromConstant<string>("retrospaceadventure_soul_boss_sound"),
      []
    );
    const steelSound = useMemo(
      () =>
        getValueFromConstant<string>("retrospaceadventure_knock_steel_sound"),
      []
    );

    useEffect(() => {
      playSoundWithPreload(soulBossSound, 0.8);
      return () => {
        releaseSound(soulBossSound, 500);
      };
    }, []);

    useEffect(() => {
      setLife(100);
    }, []);

    useEffect(() => {
      if (life !== 0 && life <= 85) {
        setDisableAttack(true);
        setDamageIcons([]);
      }
    }, [life]);

    useEffect(() => {
      const t = setInterval(() => {
        setDamageIcons((_damageIcons) =>
          _damageIcons.filter((_, i) => i !== 0)
        );
      }, 300);
      return () => {
        clearInterval(t);
      };
    }, []);

    useEffect(() => {
      if (disableAttack && damageIcons.length === 0 && life < 100) {
        setLife(100);
        setShowAnimation(true);
        playSoundEffect(heal_sound);
      }
    }, [life, disableAttack, damageIcons]);

    useEffect(() => {
      if (showAnimation) {
        setTimeout(() => {
          setDisableAttack(false);
          setShowAnimation(false);
          setStep((step + 1) as 0 | 1 | 2);
          setShowBull(true);
        }, 1000);
      }
    }, [showAnimation, step]);

    useEffect(() => {
      if (step === 2) {
        setTimeout(() => {
          nextScene();
        }, 2000);
      }
    }, [step]);

    return (
      <PageComponent>
        <Container
          iconDegat={getAssetImg(icon_degat)}
          disable={disableAttack || step === 2}
        >
          <div>
            <ImgComponent src={image} />
            <BarLifeContainer life={life}>
              <div>
                <span>R5-D4-GPT</span>
              </div>
              <div>
                <div />
              </div>
            </BarLifeContainer>
          </div>
          <div />

          <div
            onClick={(event) => {
              event.stopPropagation();
              if (disableAttack === false && step < 2) {
                playSoundEffect(steelSound, 1);
                setDamageIcons(
                  damageIcons.concat({
                    id: lastDamageIcon?.id + 1 || 0,
                    x: event.clientX,
                    y: event.clientY,
                  })
                );
                setLife(life - 0.5);
                setShowBull(false);
              }
            }}
          >
            {showAnimation ? (
              <AnimationComponent
                atlasFile={image_robot_atlas}
                animationFile={image_robot_animation}
                imageFile={image_robot_sprite}
                animationName={heal_animation_text}
                responsive={true}
                center
                blockAtMaxSize
              />
            ) : (
              <ImgFromSpriteComponent
                atlasFile={image_robot_atlas}
                frameName={
                  damageIcons.length > 0 ? sprite_idle_damage : sprite_idle_name
                }
                imageFile={image_robot_sprite}
                responsive={true}
                center
                blockAtMaxSize
              />
            )}
          </div>
          {showBull && (
            <div>
              <ImgComponent src={image_bull} />
              {step === 0 && <TranslationComponent id={bull_text} />}{" "}
              {step === 1 && <TranslationComponent id={bull_text_2} />}
              {step === 2 && <TranslationComponent id={bull_text_3} />}
            </div>
          )}
          {damageIcons.map((icon) => (
            <Fragment key={`damage_icon_${icon.id}`}>
              <ImgComponent
                style={{ position: "absolute", top: icon.y, left: icon.x }}
                src={icon_degat}
              />
            </Fragment>
          ))}
        </Container>
        <RetrospaceadventureNotification
          active={step === 2}
          objectives={[
            {
              content: "retrospaceadventure_notification_fight_partner",
              active: step === 2,
            },
          ]}
        />
      </PageComponent>
    );
  };

export default Retrospacegameadventurecomicscenefightactionaction;
