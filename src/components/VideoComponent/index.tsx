import { forwardRef } from "react";

const VideoComponent = forwardRef<
  HTMLVideoElement,
  Omit<
    React.DetailedHTMLProps<
      React.VideoHTMLAttributes<HTMLVideoElement>,
      HTMLVideoElement
    >,
    "playsInline"
  >
>(
  (
    {
      children,
      poster = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      ...rest
    },
    ref
  ) => (
    <video
      disableRemotePlayback
      {...rest}
      poster={poster}
      playsInline
      preload="auto"
      ref={ref}
    >
      {children}
    </video>
  )
);

export default VideoComponent;
