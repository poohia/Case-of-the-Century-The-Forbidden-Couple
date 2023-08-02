import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { PageComponent } from "../../../../components";
import { SceneComponentProps } from "../../../../types";

import "animate.css";
import { useGameProvider } from "../../../../gameProvider";
import { useScene } from "../../../../hooks";

type RetrospacegameadventuredemoendedPropsData = {};

const Container = styled.div`
  background: black;
  background: url("assets/images/backgroundprimary.png");
  background-size: cover;
  height: 100%;
`;

export type RetrospacegameadventuredemoendedProps = SceneComponentProps<
  {},
  RetrospacegameadventuredemoendedPropsData
>;

const Retrospacegameadventuredemoended: RetrospacegameadventuredemoendedProps =
  (props) => {
    const { playSoundEffect, getValueFromConstant } = useGameProvider();

    const { data } = props;
    const pageTurnSound = useMemo(
      () => getValueFromConstant<string>("retrospaceadventure_page_turn_sound"),
      []
    );
    const { nextScene } = useScene(props.data);

    return (
      <PageComponent>
        <Container>I'm here!!</Container>
      </PageComponent>
    );
  };

export default Retrospacegameadventuredemoended;
