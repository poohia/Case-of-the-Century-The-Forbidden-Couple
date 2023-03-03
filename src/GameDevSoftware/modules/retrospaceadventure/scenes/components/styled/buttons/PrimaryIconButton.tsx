import { ButtonProps } from "../RetrospaceadventureButtonComponent";

const PrimaryIconButton: React.FC<Pick<ButtonProps, "disabled">> = ({
  disabled,
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 371.69 279">
      <g id="Calque_2" data-name="Calque 2">
        <g id="Calque_1-2" data-name="Calque 1">
          <path
            style={{
              fill: disabled
                ? "rgba(223, 230, 233,1.0)"
                : "rgba(37, 150, 190, 1)",
            }}
            className="cls-1"
            d="M6.25 82.76A186.46 186.46 0 0 1 0 63.63c.09-6.38 0-12.76 0-19.14C0 40.34.05 3 0 0H95.29c9.94 1.82 19.83 3.78 29.68 6.23-9.85 2.45-19.74 4.41-29.68 6.23h-89l6.2-6.21c.13 13.42-.13 44.4.05 57.4a188.93 188.93 0 0 1-6.29 19.11ZM365.44 196.24a188.93 188.93 0 0 1 6.25 19.13c-.09 6.38 0 12.76-.05 19.14v44.46H276.4c-9.94-1.82-19.84-3.78-29.68-6.23 9.84-2.45 19.74-4.41 29.68-6.23h89l-6.21 6.21c-.12-13.42.13-44.4 0-57.4a184 184 0 0 1 6.25-19.13Z"
          />
          <path
            style={{
              stroke: disabled
                ? "rgba(99, 110, 114, 0.4)"
                : "rgba(37, 150, 190, 0.7)",
              strokeMiterlimit: 10,
              strokeWidth: 15,
              fill: "white",
            }}
            d="M333.79 127.58v114.85H150.22L36.86 138.13V36.57h198.01l98.92 91.01z"
          />
        </g>
      </g>
    </svg>
  );
};

export default PrimaryIconButton;
