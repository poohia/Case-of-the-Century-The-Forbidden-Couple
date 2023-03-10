import { useEffect, useRef } from "react";
import styled from "styled-components";
import { svgTheme } from "../../themes";
import { updateBoxContainer } from "../../utils";

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
        d="M28.57 59.2h1424v673.46h-1424z"
        ref={refSVGPathContent}
      />
      <path
        style={{
          fill: "none",
          stroke: "black",
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
}) => {
  const refSVGPathContent = useRef<SVGPathElement>(null);
  const refSVGPathFooter = useRef<SVGPathElement>(null);

  // const updateBoxContainer = useCallback(
  //   (
  //     from: React.RefObject<SVGPathElement>,
  //     to: React.RefObject<HTMLDivElement>
  //   ) => {
  //     if (
  //       from.current &&
  //       to.current &&
  //       refParentContainer.current &&
  //       refSVGPathContent.current
  //     ) {
  //       const { current: currentParentContainer } = refParentContainer;
  //       const { current: currentChildren } = to;
  //       const { current: currentPath } = from;

  //       const { x: xParent, y: yParent } =
  //         currentParentContainer.getBoundingClientRect();
  //       const {
  //         x,
  //         y,
  //         width: widthCurrentPath,
  //         height: heightCurrentPath,
  //       } = currentPath.getBoundingClientRect();
  //       console.log(x, y, yParent, xParent);
  //       currentChildren.style.top = `${y - yParent}px`;
  //       currentChildren.style.left = `${x - xParent}px`;
  //       currentChildren.style.width = `${widthCurrentPath}px`;
  //       currentChildren.style.height = `${heightCurrentPath}px`;
  //       currentChildren.style.display = "flex";
  //     }
  //   },
  //   []
  // );

  useEffect(() => {
    const resize = () => {
      updateBoxContainer(refParentContainer, refSVGPathContent, refChildren);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (
      !!show &&
      refSVGPathContent.current &&
      refChildren.current &&
      refParentContainer.current
    ) {
      updateBoxContainer(refParentContainer, refSVGPathContent, refChildren);
    }
  }, [show, refChildren, refSVGPathContent, refParentContainer]);

  useEffect(() => {
    if (
      !!show &&
      refSVGPathContent.current &&
      refFooterContainer.current &&
      refParentContainer.current
    ) {
      updateBoxContainer(
        refParentContainer,
        refSVGPathFooter,
        refFooterContainer
      );
    }
  }, [show, refFooterContainer, refSVGPathFooter, refParentContainer]);

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
