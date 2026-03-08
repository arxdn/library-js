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

export function sanitizeHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html')

  const dangerousSelectors = [
    'script',
    'iframe',
    'object',
    'embed',
    'form',
    'input',
    'textarea',
    'select',
    'button',
    'link',
    'meta',
    'base',
  ]
  dangerousSelectors.forEach(tag => {
    doc.querySelectorAll(tag).forEach(el => el.remove())
  })

  doc.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (
        attr.name.startsWith('on') ||
        attr.value.toLowerCase().includes('javascript:')
      ) {
        el.removeAttribute(attr.name)
      }
    })
  })

  return doc.body.innerHTML
}
