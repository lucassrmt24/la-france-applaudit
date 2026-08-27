import { useEffect, useState } from "react";

// Prochain evenement : tous les dimanches a 20h00.
function getNextEventDate() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(20, 0, 0, 0);

  const currentDay = now.getDay(); // 0 = dimanche
  let daysUntilSunday = (7 - currentDay) % 7;
  if (daysUntilSunday === 0 && now >= target) {
    daysUntilSunday = 7;
  }
  target.setDate(now.getDate() + daysUntilSunday);
  return target;
}

export function useCountdown() {
  const [target, setTarget] = useState(getNextEventDate);
  const [remaining, setRemaining] = useState(() => Math.max(0, target - new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      const diff = target - new Date();
      if (diff <= 0) {
        const next = getNextEventDate();
        setTarget(next);
        setRemaining(Math.max(0, next - new Date()));
      } else {
        setRemaining(diff);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}
