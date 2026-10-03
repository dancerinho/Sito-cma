/**
 * Un solo requestAnimationFrame per tutto il sito, con un ordine fisso:
 * prima lo scroll morbido aggiorna la posizione, poi lo sfondo si disegna
 * leggendo quella stessa posizione. Così i fili non restano mai indietro
 * di un fotogramma rispetto alla pagina.
 */

type Callback = (time: number) => void;

const subscribers: { callback: Callback; order: number }[] = [];
let frame = 0;

const loop = (time: number) => {
  frame = requestAnimationFrame(loop);
  for (const s of subscribers) s.callback(time);
};

/** Registra una funzione da chiamare a ogni fotogramma; restituisce lo stop. */
export function addTick(callback: Callback, order: number) {
  subscribers.push({ callback, order });
  subscribers.sort((a, b) => a.order - b.order);
  if (subscribers.length === 1) frame = requestAnimationFrame(loop);
  return () => {
    const i = subscribers.findIndex((s) => s.callback === callback);
    if (i >= 0) subscribers.splice(i, 1);
    if (subscribers.length === 0) cancelAnimationFrame(frame);
  };
}

/** Ordine di esecuzione nel fotogramma. */
export const TICK = { scroll: 0, background: 1 } as const;
