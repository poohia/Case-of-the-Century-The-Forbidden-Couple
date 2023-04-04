import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../../hooks";
import { calculPercent } from "../../utils";

type BarProps = {
  baseValue: number;
  value: number;
  onAnimationFinished?: () => void;
  onStartAnimation?: () => void;
};

const BarLeftComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid black;
  margin: 0 5px;
  position: relative;
  > div {
    &:nth-child(1) {
      height: 100%;
      min-width: 13%;
      width: ${({ percentLife }) => `${percentLife}%;`};
      transition: width 0.7s;
      background: rgb(0, 81, 39);
      background: linear-gradient(
        180deg,
        rgba(0, 81, 39, 1) 0%,
        rgba(58, 170, 53, 1) 100%
      );
      border-radius: 30px;
    }
    &:nth-child(2) {
      position: absolute;
      top: 15%;
      left: 2%;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        margin-right: 10px;
      }
      span {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    &:nth-child(3) {
      position: absolute;
      top: 18%;
      right: 3%;
      height: 3px;
      background: white;
      width: 200px;
      border-radius: 50%;
    }
  }
`;

const BarRightComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid black;
  margin: 0 5px;
  position: relative;
  > div {
    &:nth-child(1) {
      right: 0;
      position: absolute;
      height: 100%;
      min-width: 13%;
      width: ${({ percentLife }) => `${percentLife}%;`};
      transition: width 0.7s;
      background: rgb(0, 81, 39);
      background: linear-gradient(
        180deg,
        rgba(0, 81, 39, 1) 0%,
        rgba(58, 170, 53, 1) 100%
      );
      border-radius: 30px;
    }
    &:nth-child(3) {
      position: absolute;
      top: 15%;
      right: 2%;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        margin-left: 10px;
      }
      span {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    &:nth-child(2) {
      position: absolute;
      top: 18%;
      left: 3%;
      height: 3px;
      background: white;
      width: 200px;
      border-radius: 50%;
    }
  }
`;

const BarLeftLaserComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid black;
  margin: 0 5px;
  position: relative;
  width: 30%;
  > div {
    &:nth-child(1) {
      height: 100%;
      min-width: 20%;
      width: ${({ percentLife }) => `${percentLife}%;`};
      transition: width 0.7s;
      background: rgb(242, 167, 7);
      background: linear-gradient(
        90deg,
        rgba(242, 167, 7, 1) 72%,
        rgba(80, 100, 231, 1) 100%
      );
      border-radius: 30px;
    }
    &:nth-child(2) {
      position: absolute;
      top: 15%;
      left: 2%;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        margin-right: 10px;
      }
      span {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    &:nth-child(3) {
      position: absolute;
      top: 18%;
      right: 3%;
      height: 3px;
      background: white;
      width: 100px;
      border-radius: 50%;
    }
  }
`;

const BarRightLaserComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid black;
  margin: 0 5px;
  position: relative;
  // margin-left: 69%;
  width: 30%;
  > div {
    &:nth-child(1) {
      right: 0;
      position: absolute;
      height: 100%;
      min-width: 20%;
      width: ${({ percentLife }) => `${percentLife}%;`};
      transition: width 0.7s;
      background: rgb(80, 100, 231);
      background: linear-gradient(
        90deg,
        rgba(80, 100, 231, 1) 0%,
        rgba(242, 167, 7, 1) 18%
      );
      border-radius: 30px;
    }
    &:nth-child(2) {
      position: absolute;
      top: 15%;
      right: 2%;
      display: flex;
      align-items: center;
      img {
        width: 16px;
        margin-left: 10px;
        transform: scaleX(-1);
      }
      span {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
    &:nth-child(3) {
      position: absolute;
      top: 18%;
      left: 3%;
      height: 3px;
      background: white;
      width: 100px;
      border-radius: 50%;
    }
  }
`;

const useValue = (value: number) => {
  const [prevValue, setPrevValue] = useState<number>(value);
  useEffect(() => {
    if (prevValue > value) {
      const timer = setInterval(() => {
        setPrevValue((v) => {
          if (v > value) {
            return v - 1;
          }
          clearInterval(timer);
          return v;
        });
      }, 1);
    } else {
      const timer = setInterval(() => {
        setPrevValue((v) => {
          if (v < value) {
            return v + 1;
          }
          clearInterval(timer);
          return v;
        });
      }, 1);
    }
  }, [value]);

  return prevValue;
};

const BarLifeLeft: React.FC<BarProps> = ({
  baseValue,
  value,
  onAnimationFinished,
  onStartAnimation,
}) => {
  const { getAssetImg } = useAssets();

  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );

  const v = useValue(value);

  useEffect(() => {
    onStartAnimation && onStartAnimation();
  }, [value]);

  useEffect(() => {
    if (onAnimationFinished && v === value) {
      onAnimationFinished();
    }
  }, [v, value]);

  return (
    <BarLeftComponent percentLife={percent}>
      <div />
      <div>
        <img src={getAssetImg("life_icon.png")} alt="" />
        <span>
          {v}/{baseValue}
        </span>
      </div>
      <div />
    </BarLeftComponent>
  );
};

const BarLifeRight: React.FC<BarProps> = ({
  baseValue,
  value,
  onAnimationFinished,
  onStartAnimation,
}) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );

  const v = useValue(value);

  useEffect(() => {
    onStartAnimation && onStartAnimation();
  }, [value]);

  useEffect(() => {
    if (onAnimationFinished && v === value) {
      onAnimationFinished();
    }
  }, [v, value]);

  return (
    <BarRightComponent percentLife={percent}>
      <div />
      <div />
      <div>
        <span>
          {v}/{baseValue}
        </span>
        <img src={getAssetImg("life_icon.png")} alt="" />
      </div>
    </BarRightComponent>
  );
};

const BarLaserLeft: React.FC<BarProps> = ({
  baseValue,
  value,
  onAnimationFinished,
}) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(() => {
    const p = calculPercent(value, baseValue);
    return p > 100 ? 100 : p;
  }, [value, baseValue]);

  const v = useValue(value);

  useEffect(() => {
    if (onAnimationFinished && v === value) {
      onAnimationFinished();
    }
  }, [v, value]);

  return (
    <BarLeftLaserComponent percentLife={percent}>
      <div />
      <div>
        <img src={getAssetImg("cannon.png")} alt="" />
        <span>{v}</span>
      </div>
      <div />
    </BarLeftLaserComponent>
  );
};

const BarLaserRight: React.FC<BarProps> = ({
  baseValue,
  value,
  onAnimationFinished,
}) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(() => {
    const p = calculPercent(value, baseValue);
    return p > 100 ? 100 : p;
  }, [value, baseValue]);

  const v = useValue(value);

  useEffect(() => {
    if (onAnimationFinished && v === value) {
      onAnimationFinished();
    }
  }, [v, value]);

  return (
    <BarRightLaserComponent percentLife={percent}>
      <div />
      <div>
        <span>{v}</span>
        <img src={getAssetImg("cannon.png")} alt="" />
      </div>
      <div />
    </BarRightLaserComponent>
  );
};

export { BarLifeLeft, BarLifeRight, BarLaserLeft, BarLaserRight };
