import { generateId } from '@arxdn/shared'
import { DEFAULT_OPTIONS } from './constants'
import { Position, ToastInstance, ToastOptions, ToastType } from './types'
import { ToastBuilder } from './ToastBuilder'

interface CleanupFn {
  (): void
}

interface ToastEntry {
  instance: ToastInstance
  cleanup: CleanupFn
}

interface ResolvedOptions {
  duration: number
  position: Position
  type: ToastType
  dismissible: boolean
  pauseOnHover: boolean
  className: string
  icon: string
  onDismiss: ((instance: ToastInstance) => void) | null | undefined
}

export class ToastManager {
  private toasts: Map<string, ToastEntry>
  private containers: Map<Position, HTMLElement>
  private cleanupFns: Map<string, CleanupFn>

  constructor() {
    this.toasts = new Map()
    this.containers = new Map()
    this.cleanupFns = new Map()
    this.initEventListeners()
  }

  private initEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('toast:dismiss', ((e: CustomEvent<{ id: string }>) => {
        this.dismiss(e.detail.id)
      }) as EventListener)
    }
  }

  getContainer(position: Position): HTMLElement {
    const existing = this.containers.get(position)
    if (existing) {
      return existing
    }

    const container = document.createElement('div')
    container.className = `ui-toast-container ${position}`
    container.setAttribute('data-position', position)
    document.body.appendChild(container)
    this.containers.set(position, container)

    return container
  }

  create(message: string, options: ToastOptions = {}): ToastInstance {
    const id = generateId({ prefix: 'toast' })
    const config = this.resolveOptions(options)
    const element = ToastBuilder.build(id, message, config)
    const container = this.getContainer(config.position)
    container.appendChild(element)

    const instance: ToastInstance = {
      id,
      message,
      options: config as ToastOptions,
      element,
      dismiss: () => this.dismiss(id),
      update: (newMessage: string, newOptions?: ToastOptions) =>
        this.update(id, newMessage, newOptions),
    }

    this.toasts.set(id, { instance, cleanup: () => {} })

    requestAnimationFrame(() => {
      element.classList.add('show')
    })

    return instance
  }

  private resolveOptions(options: ToastOptions): ResolvedOptions {
    return {
      duration: options.duration ?? DEFAULT_OPTIONS.duration,
      position: options.position ?? DEFAULT_OPTIONS.position,
      type: (options.type ?? DEFAULT_OPTIONS.type) as ToastType,
      dismissible: options.dismissible ?? DEFAULT_OPTIONS.dismissible,
      pauseOnHover: options.pauseOnHover ?? DEFAULT_OPTIONS.pauseOnHover,
      className: options.className ?? DEFAULT_OPTIONS.className,
      icon: options.icon ?? DEFAULT_OPTIONS.icon,
      onDismiss: options.onDismiss ?? null,
    }
  }

  dismiss(id: string): void {
    const entry = this.toasts.get(id)
    if (!entry) {
      return
    }

    const { instance } = entry

    instance.element.remove()
    this.toasts.delete(id)
    this.cleanupFns.delete(id)

    const position = instance.options.position
    if (position) {
      const container = this.containers.get(position)
      if (container && container.children.length === 0) {
        container.remove()
        this.containers.delete(position)
      }
    }
  }

  update(id: string, newMessage: string, newOptions?: ToastOptions): void {
    const entry = this.toasts.get(id)
    if (!entry) {
      return
    }

    const { instance } = entry

    if (newMessage) {
      const messageEl = instance.element.querySelector('.ui-toast-message')
      if (messageEl) {
        messageEl.textContent = newMessage
      }
      instance.message = newMessage
    }

    if (newOptions) {
      if (newOptions.className) {
        instance.element.className = `ui-toast ${newOptions.className}`
      }

      Object.assign(instance.options, newOptions)
    }
  }
}
