import { RefObject, useEffect, useRef } from "react";

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: (event: Event) => void
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler: EventListener = (event) => {
      const { current: target } = ref;

      if (target && !target.contains(event.target as HTMLElement)) {
        callbackRef.current(event);
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [ref]);
};
