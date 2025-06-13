import { ThemeProvider } from "styled-components";
import { useScene } from "../../../../../hooks";
import { SceneComponentProps } from "../../../../../types";
import { globalTheme } from "../../theme";
import { PageComponent } from "../../../../../components";
import { useGameProvider } from "../../../../../gameProvider";
import { SceneDialogueContainer } from "./styles";

const SceneDialogue: SceneComponentProps<{}, { backgroundImage: string }> = (
  props
) => {
  const {} = useScene(props.data, {
    musics: [
      {
        sound: "main_music.mp3",
        volume: 1,
      },
    ],
  });
  const { backgroundImage } = props.data;

  const { getAssetImg } = useGameProvider();

  return (
    <ThemeProvider theme={{ ...globalTheme }}>
      <PageComponent>
        <SceneDialogueContainer
          $backgroundUrl={getAssetImg(backgroundImage)}
        ></SceneDialogueContainer>
      </PageComponent>
    </ThemeProvider>
  );
};

export default SceneDialogue;
