import { useRef, useState } from "react";

export function useHoverDelay(delay = 150) {
  const [hovered, setHovered] = useState(false);
  const timeoutRef = useRef(null);

  const onHoverChange = (isHovering) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (isHovering) {
      setHovered(true);
    } else {
      timeoutRef.current = setTimeout(() => setHovered(false), delay);
    }
  };

  return [hovered, onHoverChange];
}
