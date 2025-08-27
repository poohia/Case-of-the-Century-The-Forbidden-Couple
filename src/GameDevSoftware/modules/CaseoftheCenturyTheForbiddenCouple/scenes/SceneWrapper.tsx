import { ThemeProvider } from "styled-components";
import useUnlock from "../hooks/useUnlock";
import { globalTheme } from "../theme";
import NotifyContext from "../contexts/NotifyContext";
import { PageComponent } from "../../../../components";
import { PropsWithChildren } from "react";
import { useScene } from "../../../../hooks";

const SceneWrapper: React.FC<PropsWithChildren<{ data: any }>> = ({
  data,
  children,
}) => {
  const { notifyRest } = useUnlock(data);
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
      <NotifyContext.Provider value={notifyRest}>
        <PageComponent maxSize={{ width: 1920, height: 1080 }}>
          {children}
        </PageComponent>
      </NotifyContext.Provider>
    </ThemeProvider>
  );
};

export default SceneWrapper;
