export interface ICustomError extends Error {
  message: string;
  status?: number;
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}
