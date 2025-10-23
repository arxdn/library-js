export type { Position, ToastType, ToastOptions, ToastInstance } from './types'
export { ToastManager, toastManager } from './ToastManager'
export { ToastBuilder } from './ToastBuilder'
export { POSITIONS, TYPES, DEFAULT_OPTIONS } from './constants'
export { getDefaultIcon } from './helpers'

import { toastManager } from './ToastManager'
import type { ToastOptions } from './types'

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

  create: toastManager.create.bind(toastManager),
  dismiss: toastManager.dismiss.bind(toastManager),
  dismissAll: toastManager.dismissAll.bind(toastManager),
  update: toastManager.update.bind(toastManager),
  getAll: toastManager.getAll.bind(toastManager),
}

export default toast
