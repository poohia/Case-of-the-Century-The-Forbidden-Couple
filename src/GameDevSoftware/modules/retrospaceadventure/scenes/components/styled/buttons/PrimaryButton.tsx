import styled from "styled-components";
import { useEffect, useRef } from "react";

import { svgTheme } from "../../../themes";
import { ButtonProps } from "../RetrospaceadventureButtonComponent";
import { updateBoxContainer } from "../../../utils";
import { useGameProvider } from "../../../../../../../gameProvider";
import { TranslationComponent } from "../../../../../../../components";

export const PrimaryButtonText = styled.span<{ disabled?: boolean }>`
  position: absolute;
  display: none;
  color black;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  text-align: center;
  font-family: Audiowide;
  display: block;
  color: ${svgTheme.primaryLight};
  text-shadow:0 0 0 ${svgTheme.primaryDark},
  .0025em .0025em 0 ${svgTheme.primaryDark},
  .005em .005em 0 ${svgTheme.primaryDark},
  .0075em .0075em 0 ${svgTheme.primaryDark},
  .01em .01em 0 ${svgTheme.primaryDark},
  .0125em .0125em 0 ${svgTheme.primaryDark},
  .015em .015em 0 ${svgTheme.primaryDark},
  .0175em .0175em 0 ${svgTheme.primaryDark},
  .02em .02em 0 ${svgTheme.primaryDark},
  .0225em .0225em 0 ${svgTheme.primaryDark},
  .025em .025em 0 ${svgTheme.primaryDark},
  .0275em .0275em 0 ${svgTheme.primaryDark},
  .03em .03em 0 ${svgTheme.primaryDark},
  .0325em .0325em 0 ${svgTheme.primaryDark},
  .035em .035em 0 ${svgTheme.primaryDark},
  .0375em .0375em 0 ${svgTheme.primaryDark},
  .04em .04em 0 ${svgTheme.primaryDark},
  .0425em .0425em 0 ${svgTheme.primaryDark}, 
  .045em .045em 0 ${svgTheme.primaryDark},
  .0475em .0475em 0 ${svgTheme.primaryDark},
  .05em .05em 0 ${svgTheme.primaryDark},
  .0525em .0525em 0 ${svgTheme.primaryDark},
  .055em .055em 0 ${svgTheme.primaryDark},
  .0575em .0575em 0 ${svgTheme.primaryDark},
  .06em .06em 0 ${svgTheme.primaryDark},
  .0625em .0625em 0 ${svgTheme.primaryDark},
  .065em .065em 0 ${svgTheme.primaryDark},
  .0675em .0675em 0 ${svgTheme.primaryDark}, 
  .07em .07em 0 ${svgTheme.primaryDark},
  .0725em .0725em 0 ${svgTheme.primaryDark},
  .075em .075em 0 ${svgTheme.primaryDark},
  .0775em .0775em 0 ${svgTheme.primaryDark},
  .08em .08em 0 ${svgTheme.primaryDark},
  .0825em .0825em 0 ${svgTheme.primaryDark},
  .085em .085em 0 ${svgTheme.primaryDark},
  .0875em .0875em 0 ${svgTheme.primaryDark},
  .09em .09em 0 ${svgTheme.primaryDark},
  .0925em .0925em 0 ${svgTheme.primaryDark},
  .095em .095em 0 ${svgTheme.primaryDark},
  .0975em .0975em 0 ${svgTheme.primaryDark},
  .1em .1em 0 ${svgTheme.primaryDark};
`;

const PrimaryButton: React.FC<
  ButtonProps & { refParentContainer: React.RefObject<HTMLDivElement> }
> = ({ text, disabled, refParentContainer }) => {
  const refPathText = useRef<SVGPathElement>(null);
  const refText = useRef<HTMLSpanElement>(null);
  const { innerHeight, innerWidth } = useGameProvider();

  useEffect(() => {
    if (refPathText.current && refText.current) {
      updateBoxContainer(refParentContainer, refPathText, refText);
    }
  }, [refPathText, refText, innerHeight, innerWidth]);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 701.69 259">
        <g id="Calque_2" data-name="Calque 2">
          <g id="Calque_1-2" data-name="Calque 1">
            <path
              style={{
                fill: disabled ? svgTheme.disable : svgTheme.primary,
              }}
              className="cls-1"
              d="M6.25 82.76A186.46 186.46 0 0 1 0 63.63c.09-6.38 0-12.76 0-19.14C0 40.34.05 3 0 0H95.29c9.94 1.82 19.83 3.78 29.68 6.23-9.85 2.45-19.74 4.41-29.68 6.23h-89l6.2-6.21c.13 13.42-.13 44.4.05 57.4a188.93 188.93 0 0 1-6.29 19.11ZM695.44 176.24a188.93 188.93 0 0 1 6.25 19.13c-.09 6.38 0 12.76-.05 19.14v44.46H606.4c-9.94-1.82-19.84-3.78-29.68-6.23 9.84-2.45 19.74-4.41 29.68-6.23h89l-6.21 6.21c-.12-13.42.13-44.4 0-57.4a184 184 0 0 1 6.25-19.13Z"
            />
            <path
              style={{
                stroke: disabled
                  ? svgTheme.disableBorder
                  : svgTheme.primaryBorder,
                strokeMiterlimit: 10,
                strokeWidth: 15,
                fill: "white",
              }}
              d="M663.79 118.79v103.25H150.22L36.86 128.27V36.96h528.01l98.92 81.83z"
            />
            <path
              style={{
                fill: "none",
              }}
              d="M130.56 50.35h484v163h-484z"
              ref={refPathText}
            />
          </g>
        </g>
      </svg>
      <PrimaryButtonText ref={refText}>
        <TranslationComponent id={text} />
      </PrimaryButtonText>
    </>
  );
};
export default PrimaryButton;
