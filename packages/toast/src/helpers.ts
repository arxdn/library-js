import { ToastType } from './types'

export function getDefaultIcon(type: ToastType): string {
  const icons: Record<ToastType, string> = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
    default: '',
  }

  return icons[type] || ''
}
