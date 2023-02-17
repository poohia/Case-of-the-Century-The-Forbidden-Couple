import { useMemo } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../../hooks";
import { calculPercent } from "../../utils";

type BarProps = {
  baseValue: number;
  value: number;
};

const BarLeftComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid white;
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
      height: 6px;
      background: white;
      width: 400px;
      border-radius: 50%;
    }
  }
`;

const BarRightComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid white;
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
      height: 6px;
      background: white;
      width: 400px;
      border-radius: 50%;
    }
  }
`;

const BarLeftLaserComponent = styled.div<{ percentLife: number }>`
  height: 25px;
  border-radius: 30px;
  border: 1px solid white;
  margin: 0 5px;
  position: relative;
  width: 30%;
  > div {
    &:nth-child(1) {
      height: 100%;
      min-width: 13%;
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
  border: 1px solid white;
  margin: 0 5px;
  position: relative;
  margin-left: 69%;
  width: 30%;
  > div {
    &:nth-child(1) {
      right: 0;
      position: absolute;
      height: 100%;
      min-width: 13%;
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

const BarLifeLeft: React.FC<BarProps> = ({ baseValue, value }) => {
  const { getAssetImg } = useAssets();

  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );

  return (
    <BarLeftComponent percentLife={percent}>
      <div />
      <div>
        <img src={getAssetImg("life_icon.png")} alt="" />
        <span>
          {value}/{baseValue}
        </span>
      </div>
      <div />
    </BarLeftComponent>
  );
};

const BarLifeRight: React.FC<BarProps> = ({ baseValue, value }) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );

  return (
    <BarRightComponent percentLife={percent}>
      <div />
      <div />
      <div>
        <span>
          {value}/{baseValue}
        </span>
        <img src={getAssetImg("life_icon.png")} alt="" />
      </div>
    </BarRightComponent>
  );
};

const BarLaserLeft: React.FC<BarProps> = ({ baseValue, value }) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(() => {
    const p = calculPercent(value, baseValue);
    return p > 100 ? 100 : p;
  }, [value, baseValue]);

  return (
    <BarLeftLaserComponent percentLife={percent}>
      <div />
      <div>
        <img src={getAssetImg("cannon.png")} alt="" />
        <span>{value}</span>
      </div>
      <div />
    </BarLeftLaserComponent>
  );
};

const BarLaserRight: React.FC<BarProps> = ({ baseValue, value }) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(() => {
    const p = calculPercent(value, baseValue);
    return p > 100 ? 100 : p;
  }, [value, baseValue]);

  return (
    <BarRightLaserComponent percentLife={percent}>
      <div />
      <div>
        <span>{value}</span>
        <img src={getAssetImg("cannon.png")} alt="" />
      </div>
      <div />
    </BarRightLaserComponent>
  );
};

export { BarLifeLeft, BarLifeRight, BarLaserLeft, BarLaserRight };
