import styled from "styled-components";

export const ModalInterrogatoireResumeComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 100%;
`;

export const ModalInterrogatoireResumeHero = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
  gap: 26px;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: minmax(0, 1fr) 104px;
    gap: 14px;
    align-items: center;
  }
`;

export const ModalInterrogatoireResumeVisual = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
`;

export const ModalInterrogatoireResumePortrait = styled.div`
  position: relative;
  display: inline-flex;
  padding: 10px;
  background: #f4efe3;
  border: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow:
    0 14px 35px rgba(0, 0, 0, 0.22),
    0 2px 6px rgba(0, 0, 0, 0.12);
  transform: rotate(1.5deg);

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: 57%;
    width: 42px;
    height: 42px;
    transform: translateX(-50%);
    background: url(${({ theme }) => theme.project.image_epingle}) center /
      contain no-repeat;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.28));
  }

  > img {
    width: 100%;
    max-width: 240px;
    height: 320px;
    object-fit: cover;
    object-position: center top;
    border: 1px solid rgba(0, 0, 0, 0.08);
    background: #d8d2c6;
  }

  @media (max-width: 920px) {
    display: inline-flex;
    align-self: flex-start;
    padding: 6px;
    transform: rotate(1deg);

    &:before {
      top: -8px;
      left: 56%;
      width: 30px;
      height: 30px;
    }

    > img {
      max-width: 92px;
      width: 92px;
      height: 126px;
    }
  }
`;

export const ModalInterrogatoireResumeVisualLabel = styled.div`
  width: min(100%, 250px);
  padding: 10px 12px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  opacity: 0.9;

  @media (max-width: 920px) {
    display: none;
  }
`;

export const ModalInterrogatoireResumeContent = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding-bottom: 20px;

  @media (max-width: 920px) {
    gap: 16px;
  }
`;

export const ModalInterrogatoireResumeHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 22px;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent),
    rgba(0, 0, 0, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  align-self: center;

  @media (max-width: 920px) {
    min-height: 126px;
    justify-content: center;
    padding: 14px 16px;
    border-radius: 14px;
  }

  h3 {
    margin: 0;
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2.2rem);
    line-height: 1.05;
    text-transform: uppercase;

    @media (max-width: 920px) {
      font-size: clamp(1.15rem, 1rem + 1vw, 1.55rem);
    }
  }
`;

export const ModalInterrogatoireResumeEyebrow = styled.span`
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  opacity: 0.72;
`;

export const ModalInterrogatoireResumeLead = styled.div`
  max-width: 720px;
  line-height: 1.5;
  opacity: 0.86;
`;

export const ModalInterrogatoireResumeStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const ModalInterrogatoireResumeStatCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.08);
  min-height: 132px;
`;

export const ModalInterrogatoireResumeStatHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
`;

export const ModalInterrogatoireResumeStatLabel = styled.h4`
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
`;

export const ModalInterrogatoireResumeStatValue = styled.div`
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2.2rem);
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
`;

export const ModalInterrogatoireResumeProgress = styled.div`
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);

  > span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #d9b36c 0%, #f4deb1 100%);
    transition: width 220ms ease;
  }
`;

export const ModalInterrogatoireResumeStatCaption = styled.div`
  font-size: 0.82rem;
  opacity: 0.72;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ModalInterrogatoireResumeActions = styled.div`
  padding-top: 6px;

  > div {
  }

  button {
    min-width: 220px;
  }

  @media (max-width: 760px) {
    > div {
      justify-content: center;
    }

    button {
      min-width: unset;
      width: 100%;
    }
  }
`;
