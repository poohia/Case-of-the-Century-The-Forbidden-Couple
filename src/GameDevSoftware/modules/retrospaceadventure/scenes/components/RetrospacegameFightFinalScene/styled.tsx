import styled from "styled-components";

export const CenterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FightContainer = styled.div<{ backgroundImage: string }>`
  position: relative;
  background: url(${({ backgroundImage }) => `${backgroundImage}`});
  background-size: cover; /* Couvre toute la zone sans déformation */
  background-position: center; /* Centre l'image */
  background-repeat: no-repeat; /* Pas de répétition */
  max-width: 1920;
  max-height: 1080;
  width: 100%;
  height: 100%;
  .retrospacegame--fight-final-bar {
    position: absolute;
    &.enemy-bar {
      width: 92%;
      margin: 0 4%;
    }
    &.hero-bar {
      bottom: 0; /* Colle en bas */
      transform: rotate(90deg); /* Rotation de 90 degrés */
      transform-origin: bottom right; /* Pivot au coin inférieur droit */
      right: 55px;
      width: calc(100vh - 44px);
      padding: 0;
      padding-right: 4px;
      .hero-bar-bar {
        > div:nth-child(2) {
          width: 120px;
        }
      }
      canvas {
        transform: rotate(270deg);
      }
    }
  }
`;
