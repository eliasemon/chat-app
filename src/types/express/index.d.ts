// to make the file a module and avoid the Typescript error
export {};
declare global {
  namespace Express {
    export interface Request {
      id: string;
    }
  }
}
