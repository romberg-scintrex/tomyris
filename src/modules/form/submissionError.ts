import { FORM_ERROR } from 'final-form';

export class SubmissionError<T = Record<string, any>> extends Error {
  errors: T;

  constructor(errors: T) {
    super("Submission error");
    this.errors = errors;

    Object.setPrototypeOf(this, SubmissionError.prototype);
  }
}

/**
 * Wrap async submit with error handling for react-final-form
 */
export function withSubmissionError<T>(
  onSubmit: (data: T) => Promise<any>
): (data: T) => Promise<any> {
  return async (data: T) => {
    try {
      return await onSubmit(data);
    } catch (error: any) {
      if (error instanceof SubmissionError) {
        return error.errors;
      }

      // Generic fallback
      const fallbackMsg = error?.message || 'An unexpected error occurred';
      return { [FORM_ERROR]: fallbackMsg };
    }
  };
}
