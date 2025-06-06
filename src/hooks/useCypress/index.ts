import { useCallback } from "react";

const useCypress = () => {
  const takeShot = useCallback(() => {
    if ("takeShot" in window) {
      (window as any).takeShot();
    }
  }, []);

  return {
    takeShot,
  };
};

export default useCypress;
