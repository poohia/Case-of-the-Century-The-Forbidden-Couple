import { svgTheme } from "../../../themes";
import { ButtonProps } from "../RetrospaceadventureButtonComponent";

const SecondaryIconButton: React.FC<Pick<ButtonProps, "disabled">> = ({
  disabled,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.69 279">
      <g id="Calque_2" data-name="Calque 2">
        <g id="Calque_1-2" data-name="Calque 1">
          <path
            style={{
              fill: disabled ? svgTheme.disable : svgTheme.secondary,
            }}
            className="cls-1"
            d="M365.44 82.76a188.93 188.93 0 0 0 6.25-19.13c-.09-6.38 0-12.76-.05-19.14V.03h-65.56L276.4 0c-9.94 1.82-19.84 3.78-29.68 6.23 9.84 2.45 19.74 4.41 29.68 6.23h89l-6.21-6.21c-.12 13.42.13 44.4 0 57.4a186.46 186.46 0 0 0 6.25 19.13ZM6.25 196.24A186.46 186.46 0 0 0 0 215.37c.09 6.38 0 12.76 0 19.14C0 238.66.05 276 0 279H95.29c9.94-1.82 19.83-3.78 29.68-6.23-9.85-2.45-19.74-4.41-29.68-6.23h-89l6.2 6.21c.13-13.42-.13-44.4.05-57.4a188.93 188.93 0 0 0-6.25-19.13Z"
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
            d="M37.89 127.58v114.85h183.57l113.36-104.3V36.57h-198l-98.93 91.01z"
          />
        </g>
      </g>
    </svg>
  );
};

export default SecondaryIconButton;
