import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "./motion";

const DURATION_MS = 1200;

/**
 * Counts from 0 up to `target` once, the first time the element is visible.
 * With reduced motion the final value is shown from the start.
 */
export function useCountUp<T extends Element>(target: number) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(() =>
    prefersReducedMotion() ? target : 0,
  );

  useEffect(() => {
    const element = ref.current;

    if (!element || prefersReducedMotion()) {
      return;
    }

    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        // Count only once: stop watching as soon as it starts.
        observer.disconnect();
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1);
          const eased = 1 - (1 - progress) ** 3; // fast start, gentle stop
          setValue(Math.round(eased * target));

          if (progress < 1) {
            frame = requestAnimationFrame(step);
          }
        };

        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return { ref, value };
}
