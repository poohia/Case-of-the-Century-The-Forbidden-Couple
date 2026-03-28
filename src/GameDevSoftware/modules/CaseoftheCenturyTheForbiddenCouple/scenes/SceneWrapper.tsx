import { PropsWithChildren } from "react";

import useUnlock from "../hooks/useUnlock";
import { PageComponent } from "../../../../components";
import { useScene } from "../../../../hooks";
import UnlockContext from "../contexts/UnlockContext";
import PointsContext from "../contexts/PointsContext";
import usePointsGame from "../hooks/usePointsGame";

const PointsWrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const pointsRest = usePointsGame();
  return (
    <PointsContext.Provider value={pointsRest}>
      {children}
    </PointsContext.Provider>
  );
};

const UnLockWrapper: React.FC<PropsWithChildren<{ data: any }>> = ({
  data,
  children,
}) => {
  const unLockRest = useUnlock(data);
  return (
    <UnlockContext.Provider value={unLockRest}>
      {children}
    </UnlockContext.Provider>
  );
};

const SceneWrapper: React.FC<
  PropsWithChildren<{ data: any; sound?: string }>
> = ({ data, sound = "Visual Novel_C1_Comissariat_V2_1903.wav", children }) => {
  useScene(data, {
    musics: [
      {
        sound,
        volume: data.mainMusicVolume || 1,
      },
    ],
  });
  return (
    <PointsWrapper>
      <UnLockWrapper data={data}>
        <PageComponent maxSize={{ width: 1920, height: 1080 }}>
          {children}
        </PageComponent>
      </UnLockWrapper>
    </PointsWrapper>
  );
};

export default SceneWrapper;
