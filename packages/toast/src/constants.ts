import type { ToastOptions } from './types'

export const POSITIONS = {
  TOP_LEFT: 'top-left' as const,
  TOP_CENTER: 'top-center' as const,
  TOP_RIGHT: 'top-right' as const,
  BOTTOM_LEFT: 'bottom-left' as const,
  BOTTOM_CENTER: 'bottom-center' as const,
  BOTTOM_RIGHT: 'bottom-right' as const,
} as const

export const TYPES = {
  SUCCESS: 'success' as const,
  ERROR: 'error' as const,
  WARNING: 'warning' as const,
  INFO: 'info' as const,
  DEFAULT: 'default' as const,
} as const

export const DEFAULT_OPTIONS: Omit<Required<ToastOptions>, 'onDismiss'> & {
  onDismiss: null
} = {
  duration: 3000,
  position: POSITIONS.TOP_RIGHT,
  type: TYPES.DEFAULT,
  dismissible: true,
  pauseOnHover: true,
  className: '',
  icon: '',
  onDismiss: null,
} as const
