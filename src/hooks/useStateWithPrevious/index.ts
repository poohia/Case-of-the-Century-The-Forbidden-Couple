import { useState, useRef, useCallback } from "react";

function useStateWithPrevious<T>(
  initialValue: T
): [T, T | undefined, (newValue: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initialValue);
  const prevRef = useRef<T>();

  const setValueWithPrevious = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue((current) => {
      // stocke l’actuelle comme « précédente »
      prevRef.current = current;
      // calcule la nouvelle comme d’habitude
      return typeof newValue === "function"
        ? (newValue as (prev: T) => T)(current)
        : newValue;
    });
  }, []);

  return [value, prevRef.current, setValueWithPrevious];
}

export default useStateWithPrevious;
