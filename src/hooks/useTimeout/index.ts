import { useRef, useCallback, useState } from "react";

type TimeoutHandle = ReturnType<typeof setTimeout>;

function useTimeout(callback: () => void, delay: number) {
  const timerId = useRef<TimeoutHandle | null>(null);
  const startTime = useRef<number>(0);
  const remaining = useRef<number>(delay);
  const isRunning = useRef<boolean>(false);

  const clear = useCallback(() => {
    console.log("🚀 ~ clear ~ clear:");

    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    isRunning.current = false;
  }, [isRunning, remaining]);

  // if isRunning just resume
  const start = useCallback(() => {
    console.log("start", isRunning.current);
    if (isRunning.current) {
      resume();
      return;
    }
    clear();
    remaining.current = delay;
    isRunning.current = true;
    startTime.current = Date.now();
    console.log("1", remaining.current);

    timerId.current = setTimeout(() => {
      console.log("i'm here!!");
      callback();
      // clear();
    }, remaining.current);
  }, [callback, clear, delay]);

  const pause = useCallback(() => {
    if (!isRunning.current) return;
    clear();
    // if pause it's isRunning to
    isRunning.current = true;
    const elapsed = Date.now() - startTime.current;
    remaining.current = remaining.current - elapsed;
  }, [clear]);

  const resume = useCallback(() => {
    isRunning.current = true;
    startTime.current = Date.now();
    timerId.current = setTimeout(() => {
      callback();
      clear();
    }, remaining.current);
  }, [callback, clear]);

  const restart = useCallback(() => {
    console.log("🚀 ~ restart ~ restart:");

    remaining.current = delay;
    clear();
    start();
  }, [delay, start, clear, callback]);

  return {
    start,
    restart,
    pause,
    resume,
    clear,
    isRunning: isRunning.current,
  };
}

export default useTimeout;
