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
>(({ children, ...rest }, ref) => (
  <video {...rest} playsInline ref={ref}>
    {children}
  </video>
));

export default VideoComponent;
