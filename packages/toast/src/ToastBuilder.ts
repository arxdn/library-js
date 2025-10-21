import { TYPES } from './constants'
import { getDefaultIcon } from './helpers'
import { ToastType } from './types'

interface ToastElementParts {
  container: HTMLElement
  icon?: HTMLElement
  message: HTMLElement
  closeButton?: HTMLElement
  progressBar?: HTMLElement
}

interface BuildOptions {
  type: ToastType
  dismissible: boolean
  duration: number
  className?: string
  icon?: string
}

export class ToastBuilder {
  static build(id: string, message: string, options: BuildOptions): HTMLElement {
    const container = document.createElement('div')
    const parts = this.createContainer(id, options, container)
    this.applyBaseClasses(container, options)
    this.applyCustomClasses(container, options)
    this.applyAccessibility(container, options)
    this.appendIcon(parts, options)
    this.appendMessage(parts, message)
    this.appendCloseButton(parts, options, id)
    this.appendProgressBar(parts, options)
    return container
  }

  private static createContainer(
    id: string,
    options: BuildOptions,
    container: HTMLElement
  ): ToastElementParts {
    container.setAttribute('data-toast-id', id)
    container.setAttribute('data-toast-type', options.type)

    const messageEL = document.createElement('div')
    messageEL.className = 'ui-toast-message'
    return { container, message: messageEL }
  }

  private static applyBaseClasses(container: HTMLElement, options: BuildOptions): void {
    container.classList.add('ui-toast')
    if (options.type !== TYPES.DEFAULT) {
      container.classList.add(options.type)
    }
  }

  private static applyCustomClasses(container: HTMLElement, options: BuildOptions): void {
    if (options.className) {
      const customClasses = options.className.split(' ').filter(c => c.trim())
      customClasses.forEach(cls => container.classList.add(cls))
    }
  }

  private static applyAccessibility(container: HTMLElement, options: BuildOptions): void {
    container.setAttribute('role', options.type === TYPES.ERROR ? 'alert' : 'status')
    container.setAttribute('aria-live', options.type === TYPES.ERROR ? 'assertive' : 'polite')
  }

  private static appendIcon(parts: ToastElementParts, options: BuildOptions): void {
    if (options.icon) {
      const iconEl = document.createElement('span')
      iconEl.className = 'ui-toast-icon'
      iconEl.innerHTML = options.icon
      parts.icon = iconEl
      parts.container.appendChild(iconEl)
    } else if (options.type !== TYPES.DEFAULT && !options.className) {
      const iconEl = document.createElement('span')
      iconEl.className = 'ui-toast-icon'
      iconEl.innerHTML = getDefaultIcon(options.type)
      parts.icon = iconEl
      parts.container.appendChild(iconEl)
    }
  }

  private static appendMessage(parts: ToastElementParts, message: string): void {
    parts.message.textContent = message
    parts.container.appendChild(parts.message)
  }

  private static appendCloseButton(
    parts: ToastElementParts,
    options: BuildOptions,
    id: string
  ): void {
    if (options.dismissible) {
      const closeBtn = document.createElement('button')
      closeBtn.className = 'ui-toast-close'
      closeBtn.innerHTML = '×'
      closeBtn.setAttribute('aria-label', 'Close notification')
      closeBtn.addEventListener('click', () => {
        window.dispatchEvent(new CustomEvent('toast:dismiss', { detail: { id } }))
      })
      parts.closeButton = closeBtn
      parts.container.appendChild(closeBtn)
    }
  }

  private static appendProgressBar(parts: ToastElementParts, options: BuildOptions): void {
    if (options.duration > 0) {
      const progress = document.createElement('div')
      progress.className = 'ui-toast-progress'
      progress.style.width = '100%'
      parts.progressBar = progress
      parts.container.appendChild(progress)
    }
  }
}
