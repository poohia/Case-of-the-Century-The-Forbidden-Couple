import { forwardRef } from "react";

type VideoComponentProps = Omit<
  React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
  "playsInline"
> & {
  showPoster?: boolean;
};

const DEFAULT_POSTER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

// eslint-disable-next-line react/display-name
const VideoComponent = forwardRef<HTMLVideoElement, VideoComponentProps>(
  ({ children, poster = DEFAULT_POSTER, showPoster = false, ...rest }, ref) => (
    <video
      disableRemotePlayback
      {...rest}
      poster={showPoster ? poster : undefined}
      playsInline
      preload="auto"
      ref={ref}
    >
      {children}
    </video>
  )
);

export default VideoComponent;
