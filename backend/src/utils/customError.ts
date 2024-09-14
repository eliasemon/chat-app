import { ICustomError } from '@/types'; // Adjust the import path as necessary

class CustomError extends Error implements ICustomError {
  status?: number;

  constructor(message: string, status?: number) {
    super(message); // Call the base Error constructor
    this.status = status;

    // Set the prototype explicitly for inheritance to work correctly in ES5 environments
    Object.setPrototypeOf(this, CustomError.prototype);

    // Optionally maintain stack trace (helpful for debugging)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export default CustomError;
