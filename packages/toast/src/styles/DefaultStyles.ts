interface ToastThemeConfig {
  success: {
    background: string
    color: string
    border?: string
  }
  error: {
    background: string
    color: string
    border?: string
  }
  warning: {
    background: string
    color: string
    border?: string
  }
  info: {
    background: string
    color: string
    border?: string
  }
  default: {
    background: string
    color: string
    border?: string
  }
}

export const DEFAULT_THEME: ToastThemeConfig = {
  success: {
    background: '#10b981',
    color: '#ffffff',
    border: '1px solid #059669',
  },
  error: {
    background: '#ef4444',
    color: '#ffffff',
    border: '1px solid #dc2626',
  },
  warning: {
    background: '#f59e0b',
    color: '#ffffff',
    border: '1px solid #d97706',
  },
  info: {
    background: '#3b82f6',
    color: '#ffffff',
    border: '1px solid #2563eb',
  },
  default: {
    background: '#374151',
    color: '#ffffff',
    border: '1px solid #1f2937',
  },
}

export const BASE_STYLES = {
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  margin: '8px',
  maxWidth: '350px',
  zIndex: '9999',
} as const

export const POSITIONS = {
  'top-left': { top: '20px', left: '20px' },
  'top-center': { top: '20px', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: '20px', right: '20px' },
  'bottom-left': { bottom: '20px', left: '20px' },
  'bottom-center': { bottom: '20px', left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: '20px', right: '20px' },
} as const
