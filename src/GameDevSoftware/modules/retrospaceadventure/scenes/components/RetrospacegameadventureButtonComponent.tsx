import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

type RetrospacegameadventureButtonComponentProps = {
  children: React.ReactNode;
  animate?: boolean;
  onClick: () => void;
};

const RetrospacegameadventureButtonContainer = styled.div`
  &.image-clignote {
    animation-duration: 0.8s;
    animation-name: clignoter;
    animation-iteration-count: infinite;
    transition: none;
  }
  @keyframes clignoter {
    0% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const RetrospacegameadventureButtonComponent = (
  props: RetrospacegameadventureButtonComponentProps
) => {
  const [selected, setSelected] = useState<boolean>(false);
  const { children, animate = true, onClick } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      setSelected(true);
    },
    []
  );

  useEffect(() => {
    if (selected && animate) {
      setTimeout(() => {
        setSelected(false);
        onClick();
      }, 1000);
    } else if (selected) {
      setSelected(false);
      onClick();
    }
  }, [selected, animate, onClick]);

  useEffect(() => {
    return () => {
      setSelected(false);
    };
  }, []);

  return (
    <RetrospacegameadventureButtonContainer
      className={selected ? "image-clignote" : ""}
      onClick={handleClick}
    >
      {children}
    </RetrospacegameadventureButtonContainer>
  );
};

export default RetrospacegameadventureButtonComponent;
