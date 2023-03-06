import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGameProvider } from "../../../../../../gameProvider";
import styled from "styled-components";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import PrimaryIconButton from "./buttons/PrimaryIconButton";
import SecondaryIconButton from "./buttons/SecondaryIconButton";

export type ButtonProps = {
  preset: "primary" | "secondary";
  text: string;
  disabled?: boolean;
  refParentContainer: React.RefObject<HTMLDivElement>;
};

type RetrospaceadventureButtonComponentProps = {
  direction?: "primary" | "secondary";
  visible?: boolean;
  fluid?: boolean;
  onClick?: () => void;
} & Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "className" | "children"
> &
  Partial<ButtonProps>;

const ButtonSvgContainer = styled.div<
  Pick<RetrospaceadventureButtonComponentProps, "fluid" | "visible">
>`
  position: relative;
  cursor: pointer;
  display: ${({ visible }) => (visible ? "block" : "none !important")};
  ${({ fluid }) => (fluid ? "width: 100%;" : "")}
  color: black;
  height: 100%;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.hidden {
    visibility: hidden;
  }
`;

const RetrospaceadventureButtonComponent: React.FC<
  RetrospaceadventureButtonComponentProps
> = (props) => {
  const { playSoundWithPreload } = useGameProvider();
  const {
    preset = "primary",
    direction = "primary",
    className,
    visible = true,
    children,
    text = "",
    disabled = false,
    onClick,
    ...rest
  } = props;
  const refButton = useRef(null);

  const handleClick = useCallback(() => {
    if (onClick && !disabled) {
      playSoundWithPreload("buttonclick.mp3", 1, false, 0);
      onClick();
    }
  }, [disabled]);

  const [btnProps, setBtnProps] = useState({
    className: "hidden",
    visible,
    onClick: handleClick,
    ...rest,
  });

  useEffect(() => {
    setTimeout(
      () => {
        setBtnProps({
          ...btnProps,
          className: `animate__animated animate__bounceIn ${className}`,
        });
      },
      preset === "primary" ? 150 : 0
    );
  }, []);

  switch (preset) {
    case "secondary":
      return (
        <ButtonSvgContainer {...btnProps}>
          {direction === "primary" ? (
            <>
              <PrimaryIconButton disabled={disabled} />
              {children}
            </>
          ) : (
            <>
              <SecondaryIconButton disabled={disabled} />
              {children}
            </>
          )}
        </ButtonSvgContainer>
      );
    case "primary":
    default:
      return (
        <ButtonSvgContainer ref={refButton} {...btnProps}>
          {direction === "primary" ? (
            <PrimaryButton
              refParentContainer={refButton}
              preset={direction}
              text={text}
              disabled={disabled}
            />
          ) : (
            <SecondaryButton
              refParentContainer={refButton}
              preset={preset}
              text={text}
              disabled={disabled}
            />
          )}
        </ButtonSvgContainer>
      );
  }
};

export default RetrospaceadventureButtonComponent;
