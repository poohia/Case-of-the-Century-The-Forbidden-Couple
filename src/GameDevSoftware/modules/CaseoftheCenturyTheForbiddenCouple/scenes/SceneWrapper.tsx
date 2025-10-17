import { ThemeProvider } from "styled-components";
import useUnlock from "../hooks/useUnlock";
import { globalTheme } from "../theme";
import { PageComponent } from "../../../../components";
import { PropsWithChildren } from "react";
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
  useScene(data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: data.mainMusicVolume || 1,
      },
    ],
  });
  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PointsWrapper>
        <UnLockWrapper data={data}>
          <PageComponent maxSize={{ width: 1920, height: 1080 }}>
            {children}
          </PageComponent>
        </UnLockWrapper>
      </PointsWrapper>
    </ThemeProvider>
  );
};

export default SceneWrapper;
