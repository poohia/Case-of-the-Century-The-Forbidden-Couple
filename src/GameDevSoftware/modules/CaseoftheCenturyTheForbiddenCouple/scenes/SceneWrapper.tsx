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

const SceneWrapper: React.FC<PropsWithChildren<{ data: any }>> = ({
  data,
  children,
}) => {
  return (
    <PointsWrapper>
      <UnLockWrapper data={data}>
        <PageComponent>{children}</PageComponent>
      </UnLockWrapper>
    </PointsWrapper>
  );
};

export default SceneWrapper;
