import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { svgTheme } from "../../themes";
import { updateBoxContainer } from "../../utils";
import { useGameProvider } from "../../../../../../gameProvider";

export const ModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
`;

type ModalComponentProps = {
  preset?: "tutorial" | "game";
  width: number;
  height: number;
  refParentContainer: React.RefObject<HTMLDivElement>;
  refChildren: React.RefObject<HTMLDivElement>;
  refFooterContainer: React.RefObject<HTMLDivElement>;
  show?: boolean;
  withAnimationFast?: boolean;
};

type ModalComponentPresetProps = Pick<
  ModalComponentProps,
  "width" | "height"
> & {
  refSVGPathContent: React.RefObject<SVGPathElement>;
  refSVGPathFooter: React.RefObject<SVGPathElement>;
};

const ModalGameComponent: React.FC<ModalComponentPresetProps> = ({
  width,
  height,
  refSVGPathContent,
  refSVGPathFooter,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1511.13 852.41"
    width={width}
    height={height}
  >
    <g id="Calque_2" data-name="Calque 2">
      <path
        style={{
          stroke: svgTheme.primaryBorder,
          strokeMiterlimit: 10,
          strokeWidth: 20,
          fill: "black",
        }}
        d="M1501.13 83.63v758.78H108.45L10 758.03V10h1405.22l85.91 73.63z"
      />
      <path
        style={{
          fill: "none",
        }}
        d="M43.57 59.2h1424v673.46h-1424z"
        ref={refSVGPathContent}
      />
      <path
        style={{
          fill: "none",
        }}
        d="M113.41 767.44h1365v57h-1365z"
        ref={refSVGPathFooter}
      />
    </g>
  </svg>
);

const ModalTutorialComponent: React.FC<ModalComponentPresetProps> = ({
  width,
  height,
  refSVGPathContent,
  refSVGPathFooter,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1511.13 852.41"
    width={width}
    height={height}
  >
    <g id="Calque_2" data-name="Calque 2">
      <path
        style={{
          stroke: svgTheme.primaryBorder,
          strokeMiterlimit: 10,
          strokeWidth: 20,
          fill: "#DCDCDC",
        }}
        d="M1501.13 83.63v758.78H108.45L10 758.03V10h1405.22l85.91 73.63z"
      />
      <path
        style={{
          fill: "none",
        }}
        d="M18.41 20.44h1471V748.2h-1471z"
        ref={refSVGPathContent}
      />
      <path
        style={{
          fill: "none",
          stroke: "#b3b3b3",
          strokeMiterlimit: 10,
        }}
        d="M21.91 754.44h1469.16"
      />
      <path
        style={{
          fill: "none",
        }}
        d="M113.41 767.44h1365v57h-1365z"
        ref={refSVGPathFooter}
      />
    </g>
  </svg>
);

const ModalComponent: React.FC<ModalComponentProps> = ({
  preset = "tutorial",
  show,
  width,
  height,
  refChildren,
  refParentContainer,
  refFooterContainer,
  withAnimationFast = false,
}) => {
  const refSVGPathContent = useRef<SVGPathElement>(null);
  const refSVGPathFooter = useRef<SVGPathElement>(null);
  const [alreadyDraw, setAlreadyDraw] = useState<boolean>(false);
  const { innerHeight, innerWidth } = useGameProvider();

  useEffect(() => {
    if (
      alreadyDraw &&
      show &&
      refSVGPathContent.current &&
      refChildren.current &&
      refParentContainer.current &&
      refFooterContainer.current
    ) {
      updateBoxContainer(refParentContainer, refSVGPathContent, refChildren);
      updateBoxContainer(
        refParentContainer,
        refSVGPathFooter,
        refFooterContainer
      );
    }
  }, [
    alreadyDraw,
    show,
    refParentContainer,
    refFooterContainer,
    refChildren,
    innerHeight,
    innerWidth,
  ]);

  useEffect(() => {
    if (
      !!show &&
      refSVGPathContent.current &&
      refChildren.current &&
      refParentContainer.current
    ) {
      setTimeout(
        () => {
          updateBoxContainer(
            refParentContainer,
            refSVGPathContent,
            refChildren
          );
          setAlreadyDraw(true);
        },
        withAnimationFast ? 510 : 0
      );
    }
  }, [show, refChildren, refSVGPathContent, refParentContainer]);

  useEffect(() => {
    if (
      !!show &&
      refSVGPathContent.current &&
      refFooterContainer.current &&
      refParentContainer.current
    ) {
      setTimeout(
        () => {
          updateBoxContainer(
            refParentContainer,
            refSVGPathFooter,
            refFooterContainer
          );
        },
        withAnimationFast ? 510 : 0
      );
    }
  }, [show, refFooterContainer, refSVGPathFooter, refParentContainer]);

  useEffect(() => {}, []);

  if (preset === "game") {
    return (
      <ModalGameComponent
        height={height}
        width={width}
        refSVGPathContent={refSVGPathContent}
        refSVGPathFooter={refSVGPathFooter}
      />
    );
  }

  return (
    <ModalTutorialComponent
      height={height}
      width={width}
      refSVGPathContent={refSVGPathContent}
      refSVGPathFooter={refSVGPathFooter}
    />
  );
};

export default ModalComponent;
