import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let mounted = true;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const handler = (event: MediaQueryListEvent) => {
      if (!mounted) {
        return;
      }
      setMatches(event.matches);
    };

    if (mediaQueryList.addListener) {
      // Методы "addListener" и "removeListener" помечены как устраевшие на MDN,
      // но их необходимо использовать, т.к. в Safari < 14 методы
      // "addEventListener" и "removeEventListener" не поддерживаются.
      // https://caniuse.com/mdn-api_mediaquerylist
      mediaQueryList.addListener(handler);
    } else {
      mediaQueryList.addEventListener("change", handler);
    }

    return () => {
      mounted = false;
      if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(handler);
      } else {
        mediaQueryList.removeEventListener("change", handler);
      }
    };
  }, [query]);

  return Boolean(matches);
};
