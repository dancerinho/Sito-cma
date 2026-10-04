/**
 * Stato condiviso tra chi decide cosa mostrare (la home, che segue lo
 * scroll) e lo sfondo a particelle che lo disegna. Niente React: viene
 * letto e scritto a ogni fotogramma.
 */

export const SHAPE = { warp: 0, ring: 1, core: 2, shell: 3, vortex: 4, logo: 5 } as const;
export type ShapeId = (typeof SHAPE)[keyof typeof SHAPE];

/** Dove sta la forma: centro e raggio in pixel della finestra. */
export type Placement = { x: number; y: number; r: number };

export type UniverseTarget = {
  /** Chi pilota lo sfondo: se cambia, le particelle si ricompongono con calma. */
  key: string;
  /** Forma di partenza, forma di arrivo e avanzamento tra le due (0–1). */
  a: ShapeId;
  b: ShapeId;
  m: number;
  pa: Placement;
  pb: Placement;
  /** Luminosità complessiva (1 = piena). */
  gain: number;
};

export const universe: { target: UniverseTarget | null } = { target: null };
