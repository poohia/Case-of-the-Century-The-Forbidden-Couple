import { useMemo } from "react";
import styled from "styled-components";
import { calculPercent } from "../../utils";

type BarProps = {
  baseValue: number;
  value: number;
  preset: "life" | "laser";
};

const BarComponent = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    justify-content: center;
    span {
      font-size: 0.8rem;
      &:nth-child(1) {
        font-weight: bold;
      }
    }
  }
`;

const BarContainer = styled.div<{
  percent: number;
  preset: BarProps["preset"];
}>`
  --bar-height: 7px;
  position: relative;
  height: var(--bar-height);
  border-top: 3px solid #000;
  border-bottom: 3px solid #000;

  width: ${({ preset }) => (preset === "life" ? "100%" : "80%")};
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -3px;
    background-color: #000;
    width: 3px;
    height: var(--bar-height);
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: -3px;
    background-color: #000;
    width: 3px;
    height: var(--bar-height);
  }
  span {
    position: absolute;
    &:nth-child(1) {
      top: 0;
      left: 0;
      width: ${({ percent }) => `${percent}%`};
      height: var(--bar-height);
      background: ${({ preset }) => (preset === "life" ? "green" : "blue")};
      transition: width 2s;
    }
    &:nth-child(2) {
      top: -6px;
      left: 50%;
      font-size: 15px;
      font-weight: bold;
      -webkit-transform: translate(-50%, 0);
      -ms-transform: translate(-50%, 0);
      transform: translate(-50%, 0);
    }
  }
`;

const Bar: React.FC<BarProps> = ({ baseValue, value, preset }) => {
  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );
  return (
    <BarComponent>
      <BarContainer percent={percent} preset={preset}>
        <span>&nbsp;</span>
        <span>{value}</span>
      </BarContainer>
    </BarComponent>
  );
};

export default Bar;
