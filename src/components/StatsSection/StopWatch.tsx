import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StopWatchApi } from "../../types";

export interface StopWatchProps {
  className?: string
  apiRef?: MutableRefObject<StopWatchApi | null>
}

export default function StopWatch({ className, apiRef }: StopWatchProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [accumulatedTime, setAccumulatedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const animationFrameRef = useRef(0);
  const elRef = useRef<HTMLSpanElement>(null);

  const getTime = useCallback(
    () => {
      return accumulatedTime + (isRunning ? (Date.now() - startTime) : 0)
    },
    [isRunning, accumulatedTime, startTime],
  );

  const setTime = useCallback(
    (time: number) => {
      setAccumulatedTime(time - (isRunning ? (Date.now() - startTime) : 0));
    },
    [isRunning, startTime, setAccumulatedTime],
  );

  const getFormattedTime = useCallback(
    () => {
      const time = getTime();

      const minutes = Math.floor(time / 60000);
      const seconds = Math.floor((time - minutes * 60000) / 1000);

      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },
    [getTime],
  );

  const playAnimation = useCallback(
    () => {
      if (elRef.current) {
        elRef.current.innerText = getFormattedTime();
        animationFrameRef.current = requestAnimationFrame(playAnimation);
      }
    },
    [getFormattedTime, elRef, animationFrameRef]
  )

  const start = useCallback(
    () => {
      setIsRunning(true);
      setStartTime(Date.now());
    },
    [setIsRunning, setStartTime],
  );

  const pause = useCallback(
    () => {
      if (isRunning) {
        setIsRunning(false);
        setAccumulatedTime(prevState => Date.now() - startTime + prevState);
      }
    },
    [isRunning, setIsRunning, setAccumulatedTime, startTime],
  );
  
  const reset = useCallback(
    () => {
      setAccumulatedTime(0);
      setStartTime(Date.now());
    },
    [setStartTime, setAccumulatedTime],
  );

  const stopWatchApi: StopWatchApi = useMemo(
    () => ({
      getTime,
      setTime,
      getFormattedTime,
      start,
      pause,
      reset,
    }),
    [getTime, setTime, getFormattedTime, start, pause, reset],
  );

  useEffect(
    () => {
      if (apiRef) {
        apiRef.current = stopWatchApi;
      }
    },
    [apiRef, stopWatchApi],
  );

  useEffect(
    () => {
      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(playAnimation);
      }
      else {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isRunning],
  );

  return (
    <span className={className} ref={elRef}>
      {getFormattedTime()}
    </span>
  );
}
