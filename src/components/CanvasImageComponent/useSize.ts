import { useCallback } from "react";
import { ObjectSize } from ".";

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

      if (blockAtMaxSize && pw > frameObjectSize.w) {
        pw = frameObjectSize.w;
      }

      if (blockAtMaxSize && ph > frameObjectSize.h) {
        ph = frameObjectSize.h;
      }

      if (blockAtMinSize && pw < frameObjectSize.w) {
        pw = frameObjectSize.w;
      }

      if (blockAtMinSize && ph < frameObjectSize.h) {
        ph = frameObjectSize.h;
      }

      if (minSize && pw < minSize.w) {
        pw = minSize.w;
      }
      if (minSize && ph < minSize.h) {
        ph = minSize.h;
      }

      return [pw, ph];
    },
    []
  );

  return getSize;
};

export default useSize;
