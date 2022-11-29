import { useMemo } from "react";
import styled from "styled-components";
import { useAssets } from "../../../../../../hooks";
import { calculPercent } from "../../utils";

type BarProps = {
  baseValue: number;
  value: number;
};

const BarComponent = styled.div<{ percentLife: number }>`
  display: flex;
  flex-direction: column;
  position: relative;
  > div {
    &:first-child {
      img:first-child {
        width: 98%;
        height: 30px;
      }
      img {
        &:nth-child(2) {
          position: absolute;
          left: 0.4%;
          top: 2px;
          height: 26px;
          max-width: 97.5%;
          width: ${({ percentLife }) => `${percentLife}%;`}
          border-radius: 3px;
          transition: width 0.7s;
        }
      }
      span{
        position: absolute;
        top: 15%;
        left: 50%;
        font-weight: bold;
      }
    }
  }
`;

const Bar: React.FC<BarProps> = ({ baseValue, value }) => {
  const { getAssetImg } = useAssets();
  const percent = useMemo(
    () => calculPercent(value, baseValue),
    [value, baseValue]
  );

  return (
    <BarComponent percentLife={percent}>
      <div>
        <img src={getAssetImg("barlife.png")} alt="" />
        <img src={getAssetImg("greenlifebar.png")} alt="" />
        <span>{value}</span>
      </div>
    </BarComponent>
  );
};

export default Bar;
