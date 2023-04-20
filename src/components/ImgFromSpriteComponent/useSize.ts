import { useCallback } from "react";
import { ObjectSize } from "./types";

const useSize = () => {
  const getSize = useCallback(
    (
      parentSize: ObjectSize,
      frameObjectSize: ObjectSize,
      responsive: boolean,
      blockAtMaxSize: boolean,
      blockAtMinSize: boolean,
      minSize?: ObjectSize
    ) => {
      let pw = frameObjectSize.w,
        ph = frameObjectSize.h;
      if (responsive) {
        pw = parentSize.w;
        ph = parentSize.h;
      }
      if (responsive && blockAtMaxSize && pw > frameObjectSize.w) {
        pw = frameObjectSize.w;
      }
      if (responsive && blockAtMaxSize && ph > frameObjectSize.h) {
        ph = frameObjectSize.h;
      }
      if (responsive && blockAtMinSize && pw < frameObjectSize.w) {
        pw = frameObjectSize.w;
      }
      if (responsive && blockAtMinSize && ph < frameObjectSize.h) {
        ph = frameObjectSize.h;
      }
      if (minSize && pw < frameObjectSize.w) {
        pw = frameObjectSize.w;
      }
      if (minSize && ph < minSize.h) {
        ph = minSize.h;
      }

      //   const pw = responsive
      //   ? parentSize.w
      //   : parentSize.w > frameObjectSize.w
      //   ? frameObjectSize.w
      //   : parentSize.w;
      // const ph = responsive
      //   ? parentSize.h
      //   : parentSize.h > frameObjectSize.h
      //   ? frameObjectSize.h
      //   : parentSize.h;
      return [pw, ph];
    },
    []
  );

  return getSize;
};

export default useSize;
