import { useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

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
  width: number;
  height: number;
  refParentContainer: React.RefObject<HTMLDivElement>;
  refChildren: React.RefObject<HTMLDivElement>;
  refFooterContainer: React.RefObject<HTMLDivElement>;
  show?: boolean;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  width,
  height,
  refChildren,
  refParentContainer,
  refFooterContainer,
}) => {
  const refSVGPathContent = useRef<SVGPathElement>(null);
  const refSVGPathFooter = useRef<SVGPathElement>(null);

  const updateBoxContainer = useCallback(
    (
      from: React.RefObject<SVGPathElement>,
      to: React.RefObject<HTMLDivElement>
    ) => {
      if (
        from.current &&
        to.current &&
        refParentContainer.current &&
        refSVGPathContent.current
      ) {
        const { current: currentParentContainer } = refParentContainer;
        const { current: currentChildren } = to;
        const { current: currentPath } = from;

        const { x: xParent, y: yParent } =
          currentParentContainer.getBoundingClientRect();
        const {
          x,
          y,
          width: widthCurrentPath,
          height: heightCurrentPath,
        } = currentPath.getBoundingClientRect();

        currentChildren.style.top = `${y - yParent}px`;
        currentChildren.style.left = `${x - xParent}px`;
        currentChildren.style.width = `${widthCurrentPath}px`;
        currentChildren.style.height = `${heightCurrentPath}px`;
        currentChildren.style.display = "flex";
      }
    },
    []
  );

  useEffect(() => {
    const resize = () => {
      console.log("resize");
      updateBoxContainer(refSVGPathContent, refChildren);
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
      updateBoxContainer(refSVGPathContent, refChildren);
    }
  }, [show, refChildren, refSVGPathContent, refParentContainer]);

  useEffect(() => {
    if (
      !!show &&
      refSVGPathContent.current &&
      refFooterContainer.current &&
      refParentContainer.current
    ) {
      updateBoxContainer(refSVGPathFooter, refFooterContainer);
    }
  }, [show, refFooterContainer, refSVGPathFooter, refParentContainer]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 1632 961`}
      width={width}
      height={height}
    >
      <g id="Calque_2" data-name="Calque 2">
        <g id="Calque_1-2" data-name="Calque 1">
          <path
            ref={refSVGPathContent}
            className="cls-1"
            d="M121.49 91h1400v661h-1400z"
          />
          <path
            style={{
              fill: "rgba(37, 150, 190, 1)",
            }}
            className="cls-2"
            d="M9.13 122.75A277.79 277.79 0 0 1 0 94.38C.13 84.92 0 75.46.06 66V0h139.19c14.52 2.7 29 5.6 43.37 9.24-14.39 3.64-28.85 6.54-43.37 9.24H9.13l9.07-9.24c.18 19.9-.19 65.87.06 85.14a277.79 277.79 0 0 1-9.13 28.37Z"
          />
          <path
            style={{
              stroke: "rgba(37, 150, 190, 0.7)",
              strokeMiterlimit: 10,
              strokeWidth: 20,
              fill: "white",
            }}
            d="M1561.02 137.61v758.78H168.34l-98.46-84.37V63.98H1475.1l85.92 73.63z"
          />
          <path
            style={{
              fill: "rgba(37, 150, 190, 1)",
            }}
            className="cls-2"
            d="M1623.36 838.25a280.29 280.29 0 0 1 9.13 28.37c-.13 9.46 0 18.92-.07 28.38v66h-139.18c-14.53-2.7-29-5.6-43.37-9.24 14.38-3.64 28.84-6.54 43.37-9.24h130.12l-9.07 9.21c-.18-19.9.19-65.87-.06-85.14a277.79 277.79 0 0 1 9.13-28.37Z"
          />
          <path
            style={{
              fill: "white",
            }}
            className="cls-1"
            d="M239.49 781h1280v85h-1280z"
            ref={refSVGPathFooter}
          />
        </g>
      </g>
    </svg>
  );
};

export default ModalComponent;
