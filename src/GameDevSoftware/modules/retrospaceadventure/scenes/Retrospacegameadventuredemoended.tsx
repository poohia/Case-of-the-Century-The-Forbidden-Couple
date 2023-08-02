import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PageComponent, TranslationComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import { useScene, useStores } from "../../../../hooks";
import RetrospaceadventureButtonComponent from "./components/styled/RetrospaceadventureButtonComponent";

type RetrospacegameadventuredemoendedPropsData = {};

const Container = styled.div`
  background: black;
  background: url("assets/images/backgroundprimary.png");
  background-size: cover;
  height: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  h1 {
    margin: 0;
    font-size: 3rem;
  }
`;

const EndDemoView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding-top: 10px;
  h1 {
    margin: 0;
  }

  > div {
    width: 100%;
    height: 100%;
    &:nth-child(1) {
      height: 50%;
    }
    &:nth-child(2) {
      span {
        line-height: 40px;
        font-size: 1.3rem;
      }
    }
    &:nth-child(3) {
      display: flex;
      // flex-direction: column;
      justify-content: center;
      align-items: center;
      > div {
        width: 100%;
        padding: 20px;
      }
    }
  }
`;

export type RetrospacegameadventuredemoendedProps = SceneComponentProps<
  {},
  RetrospacegameadventuredemoendedPropsData
>;

const Retrospacegameadventuredemoended: RetrospacegameadventuredemoendedProps =
  (props) => {
    const { appConfig, platform, getValueFromConstant, push } =
      useGameProvider();
    const { openReviewUrl } = useStores();

    const { data } = props;
    const pageTurnSound = useMemo(
      () => getValueFromConstant<string>("retrospaceadventure_page_turn_sound"),
      []
    );
    const { nextScene } = useScene(props.data);
    const [view, setView] = useState<number>(0);

    const showCommentBtn = useMemo(() => {
      if (platform === "android" && appConfig.playStore) {
        return true;
      } else if (platform === "ios" && appConfig.appStore) {
        return true;
      } else if (appConfig.webStore) {
        return true;
      }
      return false;
    }, [platform]);

    useEffect(() => {
      setTimeout(
        () => setView((_view) => (_view === 0 ? _view + 1 : _view)),
        2500
      );
    }, []);

    return (
      <PageComponent>
        <Container>
          {view === 0 && (
            <TitleContainer className="animate__animated animate__zoomIn">
              <h1>{appConfig.name}</h1>
            </TitleContainer>
          )}
          {view === 1 && (
            <EndDemoView>
              <div>
                <h1>{appConfig.name}</h1>
              </div>
              <div>
                <TranslationComponent id="retrospaceadventure_label_demo_end_text" />
              </div>
              <div>
                {showCommentBtn && (
                  <div>
                    <RetrospaceadventureButtonComponent
                      fluid
                      text={"retrospaceadventure_label_comment"}
                      onClick={openReviewUrl}
                    />
                  </div>
                )}
                <div>
                  <RetrospaceadventureButtonComponent
                    fluid
                    direction="secondary"
                    text={"retrospaceadventure_label_back_home"}
                    onClick={() => push("home")}
                  />
                </div>
              </div>
            </EndDemoView>
          )}
        </Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventuredemoended;
