import { useEffect, useRef, useState } from 'react';

type Options = {
  /**
   * Debounce duration in ms to coalesce rapid resize events.
   * Useful to avoid thrashing expensive charts on animated layout changes.
   */
  debounceMs?: number;
  /**
   * How many times to retry measuring on animation frames when the
   * first measurement returns 0 (layout not settled yet).
   */
  maxInitialRetries?: number;
};

/**
 * Tracks the width of a referenced element with ResizeObserver.
 * Allows debouncing to avoid excessive renders during animated layout changes.
 */
export const useElementWidth = <T extends HTMLElement>({
  debounceMs = 0,
  maxInitialRetries = 3,
}: Options = {}) => {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<number | null>(null);
  const lastWidthRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const didCommitRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    const commitWidth = (nextWidth: number) => {
      if (nextWidth <= 0) return;
      const rounded = Math.round(nextWidth);
      if (rounded === Math.round(lastWidthRef.current)) return;
      lastWidthRef.current = rounded;

      if (!didCommitRef.current || debounceMs <= 0) {
        didCommitRef.current = true;
        setWidth(rounded);
        return;
      }

      clearTimer();
      timerRef.current = window.setTimeout(() => {
        setWidth(rounded);
        timerRef.current = null;
      }, debounceMs);
    };

    const measure = () => commitWidth(node.getBoundingClientRect().width);

    const retryIfNeeded = (attempt = 0) => {
      if (attempt >= maxInitialRetries) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const nextWidth = node.getBoundingClientRect().width;
        commitWidth(nextWidth);
        if (nextWidth <= 0) {
          retryIfNeeded(attempt + 1);
        }
      });
    };

    if (typeof ResizeObserver === 'undefined') {
      measure();
      retryIfNeeded();
      window.addEventListener('resize', measure);
      return () => {
        clearTimer();
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
        }
        window.removeEventListener('resize', measure);
      };
    }

    const observer = new ResizeObserver(([entry]) => {
      commitWidth(entry.contentRect.width);
    });

    measure();
    retryIfNeeded();
    observer.observe(node);
    return () => {
      clearTimer();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      observer.disconnect();
    };
  }, [debounceMs, maxInitialRetries]);

  return { ref, width };
};
