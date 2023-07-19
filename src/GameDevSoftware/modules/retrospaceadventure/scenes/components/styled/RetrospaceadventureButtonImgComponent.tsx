import { useCallback } from "react";
import { useGameProvider } from "../../../../../../gameProvider";
import { useAssets } from "../../../../../../hooks";

type RetrospaceadventureButtonImgComponentProps = {
  image: string;
  alt?: string;
  visible?: boolean;
  onClick?: () => void;
} & Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "className"
>;

const RetrospaceadventureButtonImgComponent: React.FC<
  RetrospaceadventureButtonImgComponentProps
> = (props) => {
  const { getAssetImg } = useAssets();
  const { playSoundWithPreload } = useGameProvider();
  const { image, alt = "", visible = true, onClick, ...rest } = props;

  const handleClick = useCallback(() => {
    if (onClick) {
      playSoundWithPreload("buttonclick.mp3", 1, false, 0);
      onClick();
    }
  }, []);

  return (
    <img
      src={getAssetImg(image)}
      alt={alt}
      onClick={handleClick}
      style={{ display: visible ? "block" : "none" }}
      {...rest}
    />
  );
};

export default RetrospaceadventureButtonImgComponent;
