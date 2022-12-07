import { useCallback } from "react";
import { useGameProvider } from "../../../../../../gameProvider";
import { useAssets } from "../../../../../../hooks";

type RetrospaceadventureButtonComponentProps = {
  image: string;
  alt?: string;
  onClick?: () => void;
} & Pick<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "className"
>;

const RetrospaceadventureButtonComponent: React.FC<
  RetrospaceadventureButtonComponentProps
> = (props) => {
  const { getAssetImg } = useAssets();
  const { playSound } = useGameProvider();
  const { image, alt = "", onClick, ...rest } = props;

  const handleClick = useCallback(() => {
    if (onClick) {
      playSound("buttonclick.mp3");
      onClick();
    }
  }, []);
  return (
    <img src={getAssetImg(image)} alt={alt} onClick={handleClick} {...rest} />
  );
};

export default RetrospaceadventureButtonComponent;
