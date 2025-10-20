import { TYPES } from './constants'
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
  static build(): HTMLElement {
    const container = document.createElement('div')
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
}
