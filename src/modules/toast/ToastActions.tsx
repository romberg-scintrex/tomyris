import React from 'react';
import { Intent, OverlayToaster, Position, Toaster } from '@blueprintjs/core';
import { Tick, Envelope, WarningSign } from '@blueprintjs/icons';

import { ForbiddenError, NotFoundError, RemoteError } from '../api/error';

import './toast.scss';

let toaster: Toaster | null = null;

function getToaster(): Toaster | null {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (!toaster) {
      toaster = OverlayToaster.create({
        position: Position.TOP,
        className: 'toast',
      });
    }
    return toaster;
  }
  return null;
}

export function showToast(message: string): void {
  const t = getToaster();
  if (!t) return;

  t.show({
    message: (
      <div className="toast-custom">
        <div className="toast-custom__icon">
          <WarningSign />
        </div>
        <div className="toast-custom__content">
          <div className="toast-custom__title">Something went wrong</div>
          <div className="toast-custom__message">{message}</div>
        </div>
      </div>
    ),
    className: 'toast-error',
    timeout: 5000,
  });
}

export function showSuccessToast(message: string): void {
  const t = getToaster();
  if (!t) return;

  t.show({
    message: (
      <div className="toast-custom">
        <div className="toast-custom__icon">
          <WarningSign />
        </div>
        <div className="toast-custom__content">
          <div className="toast-custom__title">Success</div>
          <div className="toast-custom__message">{message}</div>
        </div>
      </div>
    ),
    className: 'toast-error',
    timeout: 5000,
  });
}

export function showAlertToast(message: string): void {
  const t = getToaster();
  if (!t) return;

  t.show({
    message: (
      <div className="toast-custom">
        <div className="toast-custom__icon">
          <WarningSign />
        </div>
        <div className="toast-custom__content">
          <div className="toast-custom__title">Something went wrong</div>
          <div className="toast-custom__message">{message}</div>
        </div>
      </div>
    ),
    className: 'toast-error',
    timeout: 5000,
  });
}

export function showErrorToast(error: Error): void {
  const t = getToaster();
  if (!t) return;

  let message: string;

  if (error instanceof RemoteError) {
    message = 'Internal server error; please try again later.';
  } else if (error instanceof ForbiddenError) {
    message = 'Operation not allowed.';
  } else if (error instanceof NotFoundError) {
    message = 'Resource not found.';
  } else {
    message = error.message || 'An unexpected error occurred.';
  }

  t.show({
    message: (
      <div className="toast-custom">
        <div className="toast-custom__icon">
          <WarningSign />
        </div>
        <div className="toast-custom__content">
          <div className="toast-custom__title">Something went wrong</div>
          <div className="toast-custom__message">{message}</div>
        </div>
      </div>
    ),
    className: 'toast-error',
    timeout: 5000,
  });
}


export const toastActions = {
  showToast,
  showSuccessToast,
  showAlertToast,
  showErrorToast,
};
