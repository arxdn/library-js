import { ToastManager } from './ToastManager'
import type { ToastOptions } from './types'

export const toastManager = new ToastManager()

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    toastManager.create(message, { ...options, type: 'success' }),

  error: (message: string, options?: ToastOptions) =>
    toastManager.create(message, { ...options, type: 'error' }),

  warning: (message: string, options?: ToastOptions) =>
    toastManager.create(message, { ...options, type: 'warning' }),

  info: (message: string, options?: ToastOptions) =>
    toastManager.create(message, { ...options, type: 'info' }),

  default: (message: string, options?: ToastOptions) =>
    toastManager.create(message, { ...options, type: 'default' }),
}
