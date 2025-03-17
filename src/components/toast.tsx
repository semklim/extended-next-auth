'use client';

import { CheckCircle, Info, X, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import tRef, { type Toast as HotToast } from 'react-hot-toast';

interface ToastMessage {
  title?: string | ReactNode;
  description: string | ReactNode;
}

export type ToastInput = ToastMessage | string;

interface CustomToast extends HotToast {
  swipeDirection?: 'left' | 'right' | 'up' | 'down' | 'move' | 'cancel' | 'end';
  swipeEnd?: number;
}

export const createToastContent = (input: ToastInput): ToastMessage => {
  if (typeof input === 'string') {
    return { description: input };
  }
  return input;
};

interface ToastProps {
  t: CustomToast;
  message: ToastMessage;
  icon?: ReactNode;
  variant?: 'success' | 'error' | 'loading';
}

const ToastComponent = ({
  t,
  message,
  icon,
  variant = 'success',
}: ToastProps) => {
  const variantStyles = {
    success: 'border-green-500',
    error: 'border-red-500',
    loading: 'border-blue-500',
  };

  return (
    <div
      className={`${t.visible ? 'animate-slideIn' : 'animate-fadeOut'}
        z-50 flex w-full max-w-sm items-start gap-3 rounded-lg border bg-background ${variantStyles[variant]}
        shadow-lg ring-1 ring-black/5 transition-all`}
      style={
        {
          transform: t.visible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: t.visible ? 1 : 0,
          transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
        } as React.CSSProperties
      }
    >
      <div className="flex-1 p-3">
        <div className="relative flex items-start">
          <div className="shrink-0">{icon}</div>
          <div className="ml-3 flex-1">
            {message.title && (
              <p className="text-sm font-medium text-gray-900">
                {message.title}
              </p>
            )}
            <div className="mt-1 text-sm text-gray-500">
              {message.description}
            </div>
          </div>
          <button
            type="button"
            onClick={() => tRef.dismiss(t.id)}
            className="ml-4 inline-flex shrink-0 items-center justify-center rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X className="size-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

const successToast = (input: ToastInput, duration: number = 4000) => {
  const message = createToastContent(input);
  return tRef.custom(
    (t) => (
      <ToastComponent
        t={t as CustomToast}
        message={message}
        icon={<CheckCircle className="size-5 text-green-500" />}
        variant="success"
      />
    ),
    { duration }
  );
};

const errorToast = (input: ToastInput) => {
  const message = createToastContent(input);
  return tRef.custom(
    (t) => (
      <ToastComponent
        t={t as CustomToast}
        message={message}
        icon={<XCircle className="size-5 text-red-500" />}
        variant="error"
      />
    ),
    { duration: 4000 }
  );
};

interface PromiseToastOptions<T> {
  loading: ToastInput;
  success: ToastInput | ((data: T) => ToastInput);
  error: ToastInput | ((error: Error) => ToastInput);
}

const promiseToast = <T,>(
  promise: Promise<T>,
  options: PromiseToastOptions<T>
) => {
  return tRef.promise(
    promise,
    {
      loading: (
        <ToastComponent
          t={{ visible: true } as CustomToast}
          message={createToastContent(options.loading)}
          icon={<Info className="size-5 animate-spin text-blue-500" />}
          variant="loading"
        />
      ),
      success: (data) => {
        const successMessage =
          typeof options.success === 'function'
            ? options.success(data)
            : options.success;
        return (
          <ToastComponent
            t={{ visible: true } as CustomToast}
            message={createToastContent(successMessage)}
            icon={<CheckCircle className="size-5 text-green-500" />}
            variant="success"
          />
        );
      },
      error: (error) => {
        const errorMessage =
          typeof options.error === 'function'
            ? options.error(error)
            : options.error;
        return (
          <ToastComponent
            t={{ visible: true } as CustomToast}
            message={createToastContent(errorMessage)}
            icon={<XCircle className="size-5 text-red-500" />}
            variant="error"
          />
        );
      },
    },
    {
      duration: 10000000,
    }
  );
};

export const toast = {
  success: successToast,
  error: errorToast,
  promise: promiseToast,
};
