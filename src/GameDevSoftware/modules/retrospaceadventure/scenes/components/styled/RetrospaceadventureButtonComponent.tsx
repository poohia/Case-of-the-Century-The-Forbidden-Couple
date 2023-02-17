import { useCallback, useMemo } from "react";
import { useGameProvider } from "../../../../../../gameProvider";
import styled from "styled-components";

type RetrospaceadventureButtonComponentProps = {
  preset?: "primary" | "secondary";
  visible?: boolean;
  fluid?: boolean;
  onClick?: () => void;
} & Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "className" | "children"
>;

const ButtonContent = styled.button<
  Pick<RetrospaceadventureButtonComponentProps, "fluid" | "visible">
>`
  position: relative;
  border-radius: 30px;
  background: rgb(98, 187, 226);
  background: radial-gradient(
    circle,
    rgba(98, 187, 226, 1) 0%,
    rgba(0, 158, 226, 1) 32%,
    rgba(0, 98, 137, 1) 80%
  );
  border: 5px solid #69c8f2;
  text-transform: uppercase;
  color: white;
  padding: 4px 20px;
  cursor: pointer;
  font-weight: bold;
  display: ${({ visible }) => (visible ? "block" : "none")};
  ${({ fluid }) => (fluid ? "width: 100%;" : "")}

  &:active {
    -webkit-box-shadow: inset 0px 0px 10px #1a9dd9;
    -moz-box-shadow: inset 0px 0px 10px #1a9dd9;
    box-shadow: inset 0px 0px 10px #1a9dd9;
    outline: none;
  }

  img {
    width: 100%;
  }
`;

const ButtonSecondaryContent = styled(ButtonContent)`
  border-radius: 50%;
  width: 75px;
  height: 75px;
  border: none;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
  transform: translate(0, 0.25em);
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgb(98, 187, 226);
    background: radial-gradient(
      circle,
      rgba(98, 187, 226, 1) 0%,
      rgba(0, 158, 226, 1) 32%,
      rgba(0, 98, 137, 1) 80%
    );
    border-radius: inherit;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
  }
  &:active {
    transform: translate(0em, 0.75em);
    &::before {
      transform: translate3d(0, 0, -1em);
    }
  }
`;

const RetrospaceadventureButtonComponent: React.FC<
  RetrospaceadventureButtonComponentProps
> = (props) => {
  const { playSoundWithPreload } = useGameProvider();
  const {
    preset = "primary",
    className,
    visible = true,
    children,
    onClick,
    ...rest
  } = props;

  const handleClick = useCallback(() => {
    if (onClick) {
      playSoundWithPreload("buttonclick.mp3", 1, false, 0);
      onClick();
    }
  }, []);

  const btnProps = useMemo(
    () => ({
      className:
        preset === "secondary"
          ? className
          : `animate__animated animate__bounceIn ${className}`,
      visible,
      onClick: handleClick,
      ...rest,
    }),
    [props]
  );

  console.log(btnProps);

  switch (preset) {
    case "secondary":
      return (
        <ButtonSecondaryContent {...btnProps}>
          {children}
        </ButtonSecondaryContent>
      );
    case "primary":
    default:
      return <ButtonContent {...btnProps}>{children}</ButtonContent>;
  }
};

export default RetrospaceadventureButtonComponent;
