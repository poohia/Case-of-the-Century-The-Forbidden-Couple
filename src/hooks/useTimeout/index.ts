import { useRef, useCallback, useState } from "react";

type TimeoutHandle = ReturnType<typeof setTimeout>;

const useTimeout = (callback: () => void, delay: number, deps: any[] = []) => {
  const timerId = useRef<TimeoutHandle | null>(null);
  const startTime = useRef<number>(0);
  const remaining = useRef<number>(delay);
  const isRunning = useRef<boolean>(false);

  const clear = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    isRunning.current = false;
  }, [isRunning, remaining, ...deps]);

  // if isRunning just resume
  const start = useCallback(() => {
    if (isRunning.current) {
      resume();
      return;
    }
    clear();
    remaining.current = delay;
    isRunning.current = true;
    startTime.current = Date.now();

    timerId.current = setTimeout(() => {
      callback();
      // clear();
    }, remaining.current);
  }, [callback, clear, delay, ...deps]);

  const pause = useCallback(() => {
    if (!isRunning.current) return;
    clear();
    // if pause it's isRunning to
    isRunning.current = true;
    const elapsed = Date.now() - startTime.current;
    remaining.current = remaining.current - elapsed;
  }, [clear, ...deps]);

  const resume = useCallback(() => {
    isRunning.current = true;
    startTime.current = Date.now();
    timerId.current = setTimeout(() => {
      callback();
      clear();
    }, remaining.current);
  }, [callback, clear, ...deps]);

  const restart = useCallback(() => {
    remaining.current = delay;
    clear();
    start();
  }, [delay, start, clear, callback, ...deps]);

  return {
    start,
    restart,
    pause,
    resume,
    clear,
    isRunning: isRunning.current,
  };
};

export default useTimeout;
