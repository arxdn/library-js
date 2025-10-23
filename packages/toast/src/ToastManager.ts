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

    if (config.duration > 0) {
      const cleanup = this.setupAutoDismiss(id, instance)
      const entry = this.toasts.get(id)
      if (entry) {
        entry.cleanup = cleanup
      }
    }

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

  private setupAutoDismiss(id: string, instance: ToastInstance): CleanupFn {
    const { element, options } = instance
    const progressBar = element.querySelector('.ui-toast-progress') as HTMLElement
    const toastOptions = options as unknown as ResolvedOptions

    let startTime = Date.now()
    let remainingTime = toastOptions.duration
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let animationId: number | null = null

    const startTimer = (): void => {
      startTime = Date.now()

      timeoutId = setTimeout(() => {
        this.dismiss(id)
      }, remainingTime)

      if (progressBar) {
        const animate = (): void => {
          const elapsed = Date.now() - startTime
          const percentage = Math.max(0, 100 - (elapsed / toastOptions.duration) * 100)
          progressBar.style.width = `${percentage}%`

          if (percentage > 0) {
            animationId = requestAnimationFrame(animate)
          }
        }
        animate()
      }
    }

    const pauseTimer = (): void => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
      const elapsed = Date.now() - startTime
      remainingTime -= elapsed
    }

    if (toastOptions.pauseOnHover) {
      element.addEventListener('mouseenter', pauseTimer)
      element.addEventListener('mouseleave', startTimer)
    }

    startTimer()

    const cleanup = (): void => {
      if (timeoutId) clearTimeout(timeoutId)
      if (animationId) cancelAnimationFrame(animationId)
      element.removeEventListener('mouseenter', pauseTimer)
      element.removeEventListener('mouseleave', startTimer)
    }

    this.cleanupFns.set(id, cleanup)

    return cleanup
  }

  dismiss(id: string): void {
    const entry = this.toasts.get(id)
    if (!entry) {
      return
    }

    const { instance, cleanup } = entry
    cleanup()
    this.cleanupFns.delete(id)

    instance.element.classList.remove('show')
    instance.element.classList.add('hiding')

    setTimeout(() => {
      instance.element.remove()
      this.toasts.delete(id)

      const position = instance.options.position
      if (position) {
        const container = this.containers.get(position)
        if (container && container.children.length === 0) {
          container.remove()
          this.containers.delete(position)
        }
      }

      if (instance.options.onDismiss) {
        instance.options.onDismiss(instance)
      }
    }, 300)
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

  getAll(): ToastInstance[] {
    return Array.from(this.toasts.values()).map(entry => entry.instance)
  }

  dismissAll(): void {
    const ids = Array.from(this.toasts.keys())
    ids.forEach(id => this.dismiss(id))
  }
}

export const toastManager = new ToastManager()
