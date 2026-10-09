export const RevealDirections = {
  None: 'none',
  Up: 'up',
  FromLeft: 'fromLeft',
  FromRight: 'fromRight',
  LiftOnExit: 'liftOnExit',
} as const;

export type RevealDirection = (typeof RevealDirections)[keyof typeof RevealDirections];

/* Posición en la cascada de entrada de la sección: 0 entra primero. */
export const RevealOrders = {
  First: 'orderFirst',
  Second: 'orderSecond',
  Third: 'orderThird',
  Fourth: 'orderFourth',
} as const;

export type RevealOrder = (typeof RevealOrders)[keyof typeof RevealOrders];
