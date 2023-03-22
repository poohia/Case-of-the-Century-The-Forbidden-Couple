import { useEffect, useRef } from "react";
import { svgTheme } from "../../../themes";
import { ButtonProps } from "../RetrospaceadventureButtonComponent";
import { updateBoxContainer } from "../../../utils";
import { PrimaryButtonText } from "./PrimaryButton";
import { useGameProvider } from "../../../../../../../gameProvider";

const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  disabled,
  refParentContainer,
  ...rest
}) => {
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 701.69 259"
        {...rest}
      >
        <g id="Calque_2" data-name="Calque 2">
          <g id="Calque_1-2" data-name="Calque 1">
            <path
              style={{
                fill: disabled ? svgTheme.disable : svgTheme.secondary,
              }}
              className="cls-1"
              d="M695.44 82.76a188.93 188.93 0 0 0 6.25-19.13c-.09-6.38 0-12.76-.05-19.14V.03h-65.56L606.4 0c-9.94 1.82-19.84 3.78-29.68 6.23 9.84 2.45 19.74 4.41 29.68 6.23h89l-6.21-6.21c-.12 13.42.13 44.4 0 57.4a186.46 186.46 0 0 0 6.25 19.13ZM6.25 176.24A186.46 186.46 0 0 0 0 195.37c.09 6.38 0 12.76 0 19.14C0 218.66.05 256 0 259H95.29c9.94-1.82 19.83-3.78 29.68-6.23-9.85-2.45-19.74-4.41-29.68-6.23h-89l6.2 6.21c.13-13.42-.13-44.4.05-57.4a188.93 188.93 0 0 0-6.25-19.13Z"
            />
            <path
              style={{
                stroke: disabled
                  ? svgTheme.disableBorder
                  : svgTheme.secondaryBorder,
                strokeMiterlimit: 10,
                strokeWidth: 15,
                fill: "white",
              }}
              d="M37.89 118.79v103.25h513.57l113.37-93.77V36.96H136.82l-98.93 81.83z"
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
      <PrimaryButtonText ref={refText}>{text}</PrimaryButtonText>
    </>
  );
};

export default SecondaryButton;
