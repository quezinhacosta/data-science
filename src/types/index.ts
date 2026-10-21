export interface StepRecord {
  iteration: number;
  w0: number;
  w1: number;
  gradW0: number;
  gradW1: number;
  gradNorm: number;
  error: number;
  stepSizeW0: number;
  stepSizeW1: number;
}

export type ConvergenceStatus =
  | 'optimizing'
  | 'converged'
  | 'oscillating'
  | 'diverged';

export interface DataPoint {
  x: number;
  y: number;
}

