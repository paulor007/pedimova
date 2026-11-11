import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

export function useRevealOnScroll<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);

  const [hasEnteredViewport, setHasEnteredViewport] = useState(
    () => prefersReducedMotion() || !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasEnteredViewport) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setHasEnteredViewport(true);
        observer.disconnect();
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  return { elementRef, hasEnteredViewport };
}
