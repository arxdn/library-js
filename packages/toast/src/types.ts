export type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default'

export interface ToastOptions {
  duration?: number
  position?: Position
  type?: ToastType
  dismissible?: boolean
  pauseOnHover?: boolean
  className?: string
  icon?: string
  onDismiss?: (instance: ToastInstance) => void
}

export interface ToastInstance {
  id: string
  message: string
  options: ToastOptions
  element: HTMLElement
  dismiss: () => void
  update: (message: string, options?: ToastOptions) => void
}
