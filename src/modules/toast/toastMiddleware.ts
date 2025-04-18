import { Middleware } from 'redux';
import { SubmissionError } from '../form/submissionError';
import * as toastActions from './ToastActions';

const toastMiddleware: Middleware = (_store) => (next) => async (action) => {
  try {
    return await next(action);
  } catch (error) {
    if (error instanceof SubmissionError) {
      const formError = error.errors?.FORM_ERROR;
      if (formError) {
        toastActions.showErrorToast(new Error(formError));
      }
      throw error;
    }

    if (error instanceof Error) {
      toastActions.showErrorToast(error);
      throw error;
    }

    throw error;
  }
};

export default toastMiddleware;
