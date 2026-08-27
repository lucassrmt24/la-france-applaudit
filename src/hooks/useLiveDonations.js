import { useEffect, useRef, useState } from "react";

const BASE_AMOUNT = 1000;
const DONATION_AMOUNTS = [1, 5, 10, 25, 50];
const DONATION_WEIGHTS = [35, 30, 20, 10, 5]; // les petits dons sont plus fréquents que les gros

function mulberry32(seed) {
  let s = seed | 0;
  return function random() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hourSeed(date) {
  return (
    date.getFullYear() * 1000000 +
    (date.getMonth() + 1) * 10000 +
    date.getDate() * 100 +
    date.getHours()
  );
}

function pickDonationAmount(random) {
  const totalWeight = DONATION_WEIGHTS.reduce((a, b) => a + b, 0);
  let r = random() * totalWeight;
  for (let i = 0; i < DONATION_AMOUNTS.length; i += 1) {
    r -= DONATION_WEIGHTS[i];
    if (r <= 0) return DONATION_AMOUNTS[i];
  }
  return DONATION_AMOUNTS[DONATION_AMOUNTS.length - 1];
}

// Genere a l'avance, de facon deterministe (seed = l'heure en cours), la liste des
// "dons" qui arrivent pendant l'heure : meme sequence pour tout le monde, reset a chaque heure.
function generateDonationEvents(seed) {
  const random = mulberry32(seed);
  const events = [];
  let t = 0;
  while (t < 3600) {
    t += 5 + random() * 10; // un don toutes les 5 a 15 secondes
    if (t >= 3600) break;
    events.push({ t, amount: pickDonationAmount(random) });
  }
  return events;
}

function computeAmount(now, cache) {
  const seed = hourSeed(now);
  if (cache.seed !== seed) {
    cache.seed = seed;
    cache.events = generateDonationEvents(seed);
    cache.index = 0;
    cache.total = BASE_AMOUNT;
  }
  const secondsSinceHour = now.getMinutes() * 60 + now.getSeconds() + now.getMilliseconds() / 1000;
  while (cache.index < cache.events.length && cache.events[cache.index].t <= secondsSinceHour) {
    cache.total += cache.events[cache.index].amount;
    cache.index += 1;
  }
  return cache.total;
}

export function useLiveDonations() {
  const cacheRef = useRef({ seed: null, events: [], index: 0, total: BASE_AMOUNT });
  const [amount, setAmount] = useState(() => computeAmount(new Date(), cacheRef.current));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      const next = computeAmount(new Date(), cacheRef.current);
      setAmount((prev) => {
        if (next !== prev) {
          setPulse(true);
          setTimeout(() => setPulse(false), 500);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return { amount, pulse };
}
