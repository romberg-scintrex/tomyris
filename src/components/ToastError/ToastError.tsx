import React, { createContext, useCallback, useContext, useState } from 'react';

interface ToastContextType {
  showErrorToast: (error: Error | string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let externalShowErrorToast: (err: Error | string, duration?: number) => void = () => {};

export function useGlobalToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useGlobalToast must be used within ToastProvider');
  return context;
}

export function getGlobalErrorToastFn() {
  return externalShowErrorToast;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showErrorToast = useCallback((error: Error | string, duration = 4000) => {
    const message = typeof error === 'string' ? error : error.message;
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), duration);
  }, []);

  // Expose to non-hook usage (like in App.tsx or outside component)
  externalShowErrorToast = showErrorToast;

  return (
    <ToastContext.Provider value={{ showErrorToast }}>
      {children}
      {errorMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#d32f2f',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: '6px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          zIndex: 9999,
          maxWidth: '300px',
          fontSize: '14px',
        }}>
          {errorMessage}
        </div>
      )}
    </ToastContext.Provider>
  );
};
