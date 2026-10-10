import { RevealOrders, type RevealOrder } from './Reveal.types';

const REVEAL_ORDER_BY_STEP: readonly RevealOrder[] = [
  RevealOrders.First,
  RevealOrders.Second,
  RevealOrders.Third,
  RevealOrders.Fourth,
];

/* Cada paso entra un poco después que el anterior; los que sobran entran con el último. */
export function getStaggeredRevealOrder(step: number): RevealOrder {
  return REVEAL_ORDER_BY_STEP[step] ?? RevealOrders.Fourth;
}
