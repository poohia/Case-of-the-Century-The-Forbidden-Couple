import { forwardRef } from "react";

import { useGameProvider } from "../../gameProvider";

type VideoComponentProps = Omit<
  React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
  | "playsInline"
  | "preload"
  | "disableRemotePlayback"
  | "playsInline"
  | "children"
> & {
  src: string;
  showPoster?: boolean;
  currentTime?: number;
};

const DEFAULT_POSTER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// eslint-disable-next-line react/display-name
const VideoComponent = forwardRef<HTMLVideoElement, VideoComponentProps>(
  (
    {
      poster = DEFAULT_POSTER,
      showPoster = true,
      autoPlay = false,
      loop = false,
      muted = true,
      currentTime = 0,
      src,
      ...rest
    },
    ref
  ) => {
    const { getAssetVideo } = useGameProvider();
    return (
      <video
        disableRemotePlayback
        {...rest}
        poster={showPoster ? poster : undefined}
        playsInline
        preload="none"
        ref={ref}
        muted={muted}
        autoPlay={autoPlay}
        loop={loop}
      >
        <source
          src={`${getAssetVideo(src)}#t=${currentTime}`}
          type="video/mp4"
        />
      </video>
    );
  }
);

export default VideoComponent;
