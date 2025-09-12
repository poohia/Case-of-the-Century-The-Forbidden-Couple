import { ThemeProvider } from "styled-components";
import useUnlock from "../hooks/useUnlock";
import { globalTheme } from "../theme";
import { PageComponent } from "../../../../components";
import { PropsWithChildren } from "react";
import { useScene } from "../../../../hooks";
import UnlockContext from "../contexts/UnlockContext";

const SceneWrapper: React.FC<PropsWithChildren<{ data: any }>> = ({
  data,
  children,
}) => {
  const unLockRest = useUnlock(data);
  useScene(data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });
  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <UnlockContext.Provider value={unLockRest}>
        <PageComponent maxSize={{ width: 1920, height: 1080 }}>
          {children}
        </PageComponent>
      </UnlockContext.Provider>
    </ThemeProvider>
  );
};

export default SceneWrapper;
